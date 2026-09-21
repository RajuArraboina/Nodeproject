const fs = require('fs');
const path = 'C:/Users/Raju.a/Desktop/frontend/frontend/src/RestaurantDetails.jsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Update foodImages with specific images for categories
const oldFoodImages = `const foodImages = {
  appetizer: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80",
  "main course": "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=240&q=80",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=240&q=80",
  beverage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=240&q=80",
  biryani: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  paneer: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=240&q=80",
  mutton: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80",
  fish: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=240&q=80",
  chicken: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=240&q=80",
  dosa: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  default: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80",
};`;

const newFoodImages = `const foodImages = {
  appetizer: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80",
  "main course": "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=240&q=80",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=240&q=80",
  beverage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=240&q=80",
  biryani: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  paneer: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=240&q=80",
  mutton: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80",
  fish: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=240&q=80",
  chicken: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=240&q=80",
  dosa: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=240&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=240&q=80",
  shawarma: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=240&q=80",
  roll: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=240&q=80",
  chinese: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=240&q=80",
  samosa: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=240&q=80",
  momo: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=240&q=80",
  default: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80",
};`;

if (content.includes(oldFoodImages)) {
  content = content.replace(oldFoodImages, newFoodImages);
}

// 2. Update getFoodImage matching
const oldGetFoodImage = `function getFoodImage(item) {
  if (item.image) {
    return item.image;
  }

  const name = (item.name || "").toLowerCase();

  if (name.includes("biryani")) return foodImages.biryani;
  if (name.includes("paneer")) return foodImages.paneer;
  if (name.includes("mutton")) return foodImages.mutton;
  if (name.includes("fish")) return foodImages.fish;
  if (name.includes("chicken")) return foodImages.chicken;
  if (name.includes("dosa")) return foodImages.dosa;
  if (name.includes("butter") || name.includes("masala")) return foodImages.paneer;

  return foodImages[item.category?.toLowerCase()] || foodImages.default;
}`;

const newGetFoodImage = `function getFoodImage(item) {
  if (item.image) {
    return item.image;
  }

  const name = (item.name || "").toLowerCase();

  if (name.includes("biryani")) return foodImages.biryani;
  if (name.includes("pizza")) return foodImages.pizza;
  if (name.includes("burger")) return foodImages.burger;
  if (name.includes("cake") || name.includes("pastry") || name.includes("lava")) return foodImages.cake;
  if (name.includes("shawarma")) return foodImages.shawarma;
  if (name.includes("roll")) return foodImages.roll;
  if (name.includes("chinese") || name.includes("noodle") || name.includes("fried rice") || name.includes("manchurian") || name.includes("hakka")) return foodImages.chinese;
  if (name.includes("samosa")) return foodImages.samosa;
  if (name.includes("momo") || name.includes("gyoza") || name.includes("dumpling")) return foodImages.momo;
  if (name.includes("paneer")) return foodImages.paneer;
  if (name.includes("mutton")) return foodImages.mutton;
  if (name.includes("fish")) return foodImages.fish;
  if (name.includes("chicken")) return foodImages.chicken;
  if (name.includes("dosa")) return foodImages.dosa;
  if (name.includes("butter") || name.includes("masala")) return foodImages.paneer;

  return foodImages[item.category?.toLowerCase()] || foodImages.default;
}`;

if (content.includes(oldGetFoodImage)) {
  content = content.replace(oldGetFoodImage, newGetFoodImage);
}

// 3. Update filteredRestaurants matching
const oldFilter = `  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchText = search.trim().toLowerCase();
    const countryText = country.toLowerCase();
    const menuText = (restaurant.menuItems || []).map((item) => item.name).join(" ");
    const searchableText = [restaurant.name, restaurant.cuisine, restaurant.country, restaurant.description, menuText]
      .map((value) => String(value || "").toLowerCase())
      .join(" ");

    return (!searchText || searchableText.includes(searchText))
      && (!countryText || searchableText.includes(countryText));
  });`;

const newFilter = `  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchText = search.trim().toLowerCase();
    const countryText = country.toLowerCase();
    const menuItems = restaurant.menuItems || [];
    const menuText = menuItems
      .map((item) => \`\${item.name} \${item.category || ""} \${item.category === "Dessert" ? "desserts" : ""}\`)
      .join(" ");
    const searchableText = [
      restaurant.name,
      restaurant.cuisine,
      restaurant.country,
      restaurant.description,
      restaurant.address?.city,
      restaurant.address?.street,
      menuText,
    ]
      .map((value) => String(value || "").toLowerCase())
      .join(" ");

    return (!searchText || searchableText.includes(searchText))
      && (!countryText || searchableText.includes(countryText));
  });`;

if (content.includes(oldFilter)) {
  content = content.replace(oldFilter, newFilter);
}

// 4. Fix currency and button symbols
content = content.replace(/<strong>[^<]*\{item\.price\}<\/strong>/g, '<strong>₹{item.price}</strong>');
content = content.replace(/aria-label=\{`Decrease \$\{item\.name\}`\}>[\s\S]*?<\/button>/g, 'aria-label={`Decrease ${item.name}`}>-</button>');
content = content.replace(/<div className="location-pill" aria-label="Current location">[\s\S]*?<\/div>/g, '<div className="location-pill" aria-label="Current location">📍 <span>Warangal, Telangana</span></div>');
content = content.replace(/No restaurants found for [^<]*\./g, 'No restaurants found for "{search}".');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated RestaurantDetails.jsx!');
