import { useState } from "react";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "China",
  "Mexico",
  "Italy",
  "France",
  "Germany",
  "Spain",
  "United Arab Emirates",
  "Saudi Arabia",
  "South Africa",
];

function CreateRestaurant({ onBack, onCreated }) {
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    country: "India",
    rating: "",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateRestaurant(field, value) {
    setRestaurant((current) => ({ ...current, [field]: value }));
  }

  function addFoodItem() {
    setMenuItems((items) => [...items, { name: "", price: "", category: "Main Course" }]);
  }

  function updateFoodItem(index, field, value) {
    setMenuItems((items) => items.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: value } : item
    )));
  }

  function removeFoodItem(index) {
    setMenuItems((items) => items.filter((_, itemIndex) => itemIndex !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    try {
      const incompleteItem = menuItems.find((item) => !item.name.trim() || item.price === "");
      if (incompleteItem) {
        throw new Error("Please complete every food item or remove the empty row");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in before creating a restaurant");
      }

      const response = await fetch("http://localhost:5000/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...restaurant,
          cuisine: restaurant.country,
          rating: restaurant.rating === "" ? undefined : Number(restaurant.rating),
          ...(menuItems.length > 0
            ? { menuItems: menuItems.map((item) => ({ ...item, price: Number(item.price) })) }
            : {}),
        }),
      });
      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Restaurant creation failed");
      }

      setStatus(data.message || "Restaurant created successfully");
      onCreated();
    } catch (error) {
      setStatus(error.message || "Unable to connect to the backend");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-panel restaurant-form-panel">
      <div className="login-heading">
        <p className="eyebrow">RESTAURANT OWNER</p>
        <h1>Create restaurant</h1>
        <p>Add your restaurant and menu for customers to discover.</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Restaurant name
          <input className="login-input" type="text" value={restaurant.name} onChange={(event) => updateRestaurant("name", event.target.value)} placeholder="e.g. Spice Garden" required />
        </label>
        <label>
          Description
          <textarea className="login-input" value={restaurant.description} onChange={(event) => updateRestaurant("description", event.target.value)} placeholder="Tell customers about your restaurant" rows="3" />
        </label>
        <label>
          Country
          <select className="login-input country-select" value={restaurant.country} onChange={(event) => updateRestaurant("country", event.target.value)} required>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>
        <label>
          Rating
          <input className="login-input" type="number" min="0" max="5" step="0.1" value={restaurant.rating} onChange={(event) => updateRestaurant("rating", event.target.value)} placeholder="e.g. 4.5" />
        </label>
        <div className="food-form-heading">
          <p className="form-section-label">Food items (optional)</p>
          <button className="add-food-button" type="button" onClick={addFoodItem}>+ Add food item</button>
        </div>
        {menuItems.map((item, index) => (
          <div className="food-form-row" key={index}>
            <label>
              Food item name
              <input className="login-input" type="text" value={item.name} onChange={(event) => updateFoodItem(index, "name", event.target.value)} placeholder="e.g. Chicken Biryani" />
            </label>
            <label>
              Price
              <input className="login-input" type="number" min="0" step="0.01" value={item.price} onChange={(event) => updateFoodItem(index, "price", event.target.value)} placeholder="e.g. 280" />
            </label>
            <label>
              Category
              <select className="login-input" value={item.category} onChange={(event) => updateFoodItem(index, "category", event.target.value)}>
                <option>Appetizer</option>
                <option>Main Course</option>
                <option>Dessert</option>
                <option>Beverage</option>
              </select>
            </label>
            <button className="remove-food-button" type="button" onClick={() => removeFoodItem(index)}>Remove</button>
          </div>
        ))}
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create restaurant"}
        </button>
        {status && <p className="login-status" role="status">{status}</p>}
      </form>
      <button className="back-button" type="button" onClick={onBack}>Back to restaurants</button>
    </section>
  );
}

export default CreateRestaurant;
