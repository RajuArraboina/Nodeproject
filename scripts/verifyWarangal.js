const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('../models/restaurantModel');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const warangalList = await Restaurant.find({ 'address.city': { $regex: 'Warangal', $options: 'i' } });
    console.log(`\n======================================================`);
    console.log(`Total Warangal Restaurants Found: ${warangalList.length}`);
    console.log(`======================================================\n`);

    console.table(
      warangalList.map((r, i) => ({
        '#': i + 1,
        Name: r.name,
        Cuisine: r.cuisine,
        Location: r.address ? `${r.address.street}, ${r.address.city}` : 'N/A',
        Rating: r.rating,
        'Menu Items': r.menuItems ? r.menuItems.length : 0,
        Phone: r.phone || 'N/A',
      }))
    );

    const total = await Restaurant.countDocuments({});
    console.log(`\nTotal restaurants in database across all cities: ${total}\n`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
