const fs = require('fs');
const path = 'C:/Users/Raju.a/Desktop/frontend/frontend/src/RestaurantDetails.jsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Add tiffins images to foodImages
const oldFoodImagesPart = `  dosa: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  pizza:`;

const newFoodImagesPart = `  dosa: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  idli: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=240&q=80",
  vada: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=240&q=80",
  poori: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=240&q=80",
  upma: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=240&q=80",
  bonda: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=240&q=80",
  tiffin: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=240&q=80",
  pizza:`;

if (content.includes(oldFoodImagesPart)) {
  content = content.replace(oldFoodImagesPart, newFoodImagesPart);
}

// 2. Add tiffins to foodCategories
const oldCategories = `  { name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=85" },
  { name: "Dosa", image: foodImages.dosa },
];`;

const newCategories = `  { name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=85" },
  { name: "Dosa", image: foodImages.dosa },
  { name: "Tiffins", image: foodImages.idli || foodImages.dosa },
  { name: "Idli", image: foodImages.idli || foodImages.dosa },
  { name: "Poori", image: foodImages.poori || foodImages.dosa },
];`;

if (content.includes(oldCategories)) {
  content = content.replace(oldCategories, newCategories);
}

// 3. Add tiffin keywords to getFoodImage
const oldGetFoodImg = `  if (name.includes("chicken")) return foodImages.chicken;
  if (name.includes("dosa")) return foodImages.dosa;
  if (name.includes("butter") || name.includes("masala")) return foodImages.paneer;`;

const newGetFoodImg = `  if (name.includes("chicken")) return foodImages.chicken;
  if (name.includes("idli")) return foodImages.idli;
  if (name.includes("vada")) return foodImages.vada;
  if (name.includes("poori") || name.includes("puri") || name.includes("bhature")) return foodImages.poori;
  if (name.includes("upma") || name.includes("pongal")) return foodImages.upma;
  if (name.includes("bonda") || name.includes("bajji")) return foodImages.bonda;
  if (name.includes("dosa") || name.includes("pesarattu") || name.includes("uttapam") || name.includes("tiffin")) return foodImages.dosa;
  if (name.includes("butter") || name.includes("masala")) return foodImages.paneer;`;

if (content.includes(oldGetFoodImg)) {
  content = content.replace(oldGetFoodImg, newGetFoodImg);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated RestaurantDetails.jsx with Tiffin categories!');
