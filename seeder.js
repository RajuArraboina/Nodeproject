const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('./models/restaurantModel');
const User = require('./models/userModel');

const users = [
  {
    name: 'Raju',
    email: 'raju@gmail.com',
    password: '12345678',
    role: 'admin',
  },
];

const restaurants = [
  {
    name: 'The Rustic Olive',
    description: 'Authentic Mediterranean and Italian cuisine with fresh organic ingredients.',
    cuisine: 'Italian',
    address: { street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001' },
    phone: '+1 555-0199',
    email: 'info@rusticolive.com',
    rating: 4.8,
    isOpen: true,
    menuItems: [
      { name: 'Bruschetta Trio', price: 12.99, category: 'Appetizer', isVegetarian: true },
      { name: 'Truffle Tagliatelle', price: 24.50, category: 'Main Course', isVegetarian: true },
      { name: 'Tiramisu', price: 9.00, category: 'Dessert', isVegetarian: true },
    ],
  },
  {
    name: 'Sakura Zen',
    description: 'Contemporary Japanese sushi, sashimi, and artisanal ramen bowls.',
    cuisine: 'Japanese',
    address: { street: '456 Blossom Ave', city: 'San Francisco', state: 'CA', zipCode: '94102' },
    phone: '+1 555-0288',
    email: 'hello@sakurazen.com',
    rating: 4.9,
    isOpen: true,
    menuItems: [
      { name: 'Dragon Roll', price: 18.00, category: 'Main Course', isVegetarian: false },
      { name: 'Tonkotsu Ramen', price: 16.50, category: 'Main Course', isVegetarian: false },
      { name: 'Matcha Mochi', price: 7.50, category: 'Dessert', isVegetarian: true },
    ],
  },
  {
    name: 'Tacos Del Sol',
    description: 'Vibrant Mexican street food, fresh handmade tacos, and house salsas.',
    cuisine: 'Mexican',
    address: { street: '789 Sunset Blvd', city: 'Austin', state: 'TX', zipCode: '78701' },
    phone: '+1 555-0377',
    email: 'hola@tacosdelsol.com',
    rating: 4.7,
    isOpen: true,
    menuItems: [
      { name: 'Carne Asada Tacos', price: 14.00, category: 'Main Course', isVegetarian: false },
      { name: 'Guacamole & Chips', price: 8.50, category: 'Appetizer', isVegetarian: true },
      { name: 'Churros with Dulce de Leche', price: 7.00, category: 'Dessert', isVegetarian: true },
    ],
  },
];

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB Atlas: ${conn.connection.host}`);

    // Seed User (delete existing if already registered to ensure fresh hash)
    for (const userData of users) {
      await User.deleteOne({ email: userData.email });
      await User.create(userData);
      console.log(`Successfully seeded User: ${userData.email}`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
