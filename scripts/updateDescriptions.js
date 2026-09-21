const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('../models/restaurantModel');
const { getDefaultDescriptionByCuisine } = require('../utils/menuGenerator');

const customDescriptions = {
  'kings': 'kings offers an authentic Indian royal dining experience with rich flavorful curries, traditional tandoori grills, and aromatic dum biryanis.',
  'abhi': 'abhi is a distinguished Indian restaurant serving freshly prepared coastal specialties, aromatic seafood curries, and authentic tandoori delights.',
  'Rmaya Restaurant': 'Rmaya Restaurant offers an authentic Indian dining experience featuring rich flavorful curries, traditional tandoori grills, and aromatic dum biryanis prepared with pure spices.',
  'SR Restaurant': 'SR Restaurant is a premier Indian family dining destination offering traditional delicacies, fragrant biryanis, and rich Mughlai curries.',
  "Raju's Spice Restaurant": "Raju's Spice Restaurant is a signature Indian kitchen renowned for rich flavorful curries, authentic tandoori grills, and warm hospitality.",
  'Royal Spice Kitchen': 'Authentic North and South Indian culinary experience featuring royal dum biryanis, slow-cooked curries, and sizzling clay oven tandoori specialties.',
  'The Rustic Olive': 'Authentic Italian trattoria serving wood-fired artisanal pizzas, freshly rolled pastas, and hand-selected Mediterranean wines.',
  'Sakura Zen': 'Contemporary Japanese dining destination featuring mastercrafted sushi, sashimi, and rich 14-hour artisanal ramen bowls.',
  'Tacos Del Sol': 'Vibrant Mexican street food experience with freshly pressed heirloom corn tortillas, slow-marinated meats, and house-crafted salsas.',
  'Azure Coast Seafood': 'Fresh seaside Mediterranean cuisine offering pan-seared ocean catches, coastal mezze plates, and signature wines.',
  'Heritage Mughlai Darbar': 'Legendary royal Mughlai kitchen crafting authentic Lucknowi dum biryanis, melt-in-mouth kebabs, and velvety saffron curries.',
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const restaurants = await Restaurant.find({});
    console.log(`Found ${restaurants.length} restaurants in database.`);

    for (const r of restaurants) {
      const newDesc = customDescriptions[r.name] || getDefaultDescriptionByCuisine(r.name, r.cuisine);
      r.description = newDesc;
      await r.save();
      console.log(`✓ Updated [${r.name}] (${r.cuisine}): ${r.description}`);
    }

    console.log('\nAll restaurant descriptions updated successfully in MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating descriptions:', err.message);
    process.exit(1);
  }
})();
