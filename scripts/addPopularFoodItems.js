const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('../models/restaurantModel');

const newItemsByRestaurant = {
  'Grand Gayathri Restaurant': [
    {
      name: 'Gourmet Farmhouse Veggie Pizza',
      description: 'Hand-stretched crust loaded with bell peppers, olives, corn, mushrooms, and melted mozzarella.',
      price: 260,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Double Cheese Crunch Burger',
      description: 'Crispy seasoned patty with cheddar cheese slice, fresh lettuce, tomato, and house burger sauce.',
      price: 160,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Red Velvet Lava Cake Slice',
      description: 'Moist red velvet sponge with a molten cream cheese center, drizzled with berry compote.',
      price: 140,
      category: 'Dessert',
      isVegetarian: true,
    },
    {
      name: 'Arabian Grilled Chicken Shawarma',
      description: 'Thin pita stuffed with slow-roasted spiced chicken, garlic toum, pickles, and crispy fries.',
      price: 180,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Kolkata Chicken Kathi Rolls',
      description: 'Flaky paratha rolled with tandoori spiced chicken, sliced onions, lime juice, and green chutney.',
      price: 160,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Wok-Tossed Schezwan Chinese Fried Rice',
      description: 'Fragrant basmati rice wok-tossed with fresh vegetables, scallions, and spicy Chinese Schezwan sauce.',
      price: 210,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Steamed Paneer Delight Momo (6 pcs)',
      description: 'Tender steamed dumplings stuffed with spiced cottage cheese and cilantro, served with spicy red chutney.',
      price: 150,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Dhaba Samosa Chaat with Tangy Chole',
      description: 'Crushed golden samosas topped with spicy chickpea curry, sweet yogurt, tamarind, and sev.',
      price: 85,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Sizzling Chocolate Brownie (Desserts)',
      description: 'Warm walnut brownie served with vanilla gelato and sizzling dark chocolate sauce.',
      price: 150,
      category: 'Dessert',
      isVegetarian: true,
    },
  ],

  'Haveli Multi Cuisine Restaurant': [
    {
      name: 'Wood-Fired Paneer Tikka Pizza',
      description: 'Crispy thin crust topped with charred tandoori paneer, red onions, capsicum, and mozzarella cheese.',
      price: 280,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Chicken Zinger Burger',
      description: 'Golden fried chicken breast fillet with spicy mayo, crunchy iceberg lettuce, and toasted sesame bun.',
      price: 190,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Belgian Chocolate Truffle Cake Slice',
      description: 'Rich, velvety dark chocolate sponge layered with decadent Belgian chocolate ganache.',
      price: 135,
      category: 'Dessert',
      isVegetarian: true,
    },
    {
      name: 'Falafel & Tahini Veg Shawarma Roll',
      description: 'Crisp golden chickpea falafels with shredded greens, cucumber, and creamy sesame tahini sauce in pita.',
      price: 140,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Paneer Tikka Kathi Rolls',
      description: 'Char-grilled cottage cheese cubes wrapped in flaky paratha with mint mayonnaise and pickled onions.',
      price: 150,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Schezwan Hakka Noodles (Chinese)',
      description: 'Classic wok-tossed noodles with shredded cabbage, carrots, bell peppers, and zesty Chinese chili oil.',
      price: 200,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Steamed Chicken Himalayan Momo (6 pcs)',
      description: 'Delicate handmade dumplings filled with juicy minced chicken, ginger, and garlic, served with fiery sesame dip.',
      price: 170,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Cocktail Punjabi Samosa Platter (4 pcs)',
      description: 'Bite-sized crispy samosas filled with savory spiced potatoes and peas, served with sweet tamarind dip.',
      price: 80,
      category: 'Appetizer',
      isVegetarian: true,
    },
  ],

  'Maitrivanam Family Restaurant': [
    {
      name: 'Special Rumali Chicken Shawarma Roll',
      description: 'Soft thin rumali roti stuffed with marinated grilled chicken, creamy garlic sauce, and mild herbs.',
      price: 160,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Spicy Crispy Chicken Burger',
      description: 'Spicy battered fried chicken fillet with peri-peri seasoned mayo on a grilled brioche bun.',
      price: 175,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Double Egg Paneer Kathi Rolls',
      description: 'Layered paratha with egg coating, packed with spiced paneer strips, sliced capsicum, and chaat masala.',
      price: 150,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Chilli Chicken Dry (Chinese)',
      description: 'Crispy fried chicken chunks tossed with diced bell peppers, green chilies, garlic, and soy sauce.',
      price: 240,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Pan-Fried Schezwan Chicken Momo (6 pcs)',
      description: 'Steamed chicken dumplings pan-seared for a crisp bottom and tossed in spicy Schezwan glaze.',
      price: 180,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Hyderabadi Keema Samosa (2 pcs)',
      description: 'Crisp triangular pastry pockets filled with spicy minced meat, mint, and roasted cumin seeds.',
      price: 90,
      category: 'Appetizer',
      isVegetarian: false,
    },
  ],

  'kings': [
    {
      name: 'Classic Cheesy Margherita Pizza',
      description: 'Loaded with Italian tomato sauce, generous melted mozzarella, and fragrant dried oregano.',
      price: 240,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Maharaja Supreme Veg Burger',
      description: 'Crispy spiced potato and pea patty with double cheese, sliced onions, and tangy thousand island dressing.',
      price: 150,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Dark Chocolate Truffle Cake Slice',
      description: 'Decadent multi-layered dark chocolate sponge with smooth ganache and chocolate curls.',
      price: 130,
      category: 'Dessert',
      isVegetarian: true,
    },
    {
      name: 'Authentic Lebanese Chicken Shawarma',
      description: 'Tender chicken shavings from the vertical spit wrapped in warm pita with garlic toum and dill pickles.',
      price: 170,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Tandoori Chicken Malai Rolls',
      description: 'Creamy malai kebab chunks wrapped in soft paratha with mint chutney and fresh onion rings.',
      price: 165,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Crispy Veg Manchurian Dry (Chinese)',
      description: 'Fried minced vegetable balls tossed in an aromatic dark soy, ginger, and garlic sauce.',
      price: 190,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Steamed Veg Darjeeling Momo (6 pcs)',
      description: 'Authentic thin-wrapper steamed momos packed with finely chopped cabbage, carrots, and spring onions.',
      price: 140,
      category: 'Appetizer',
      isVegetarian: true,
    },
  ],

  'Subani Mutton Biryani Centre': [
    {
      name: 'Charcoal Grilled Mutton Shawarma',
      description: 'Juicy spiced pulled mutton wrapped in warm pita with roasted pepper tahini sauce.',
      price: 210,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Spicy Mutton Boti Rolls',
      description: 'Slow-roasted pepper mutton boti wrapped in soft paratha with lemon and mint onions.',
      price: 190,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Hyderabadi Firewood Keema Samosa (2 pcs)',
      description: 'Flaky pastry stuffed with slow-cooked spicy goat minced meat and mint leaves.',
      price: 95,
      category: 'Appetizer',
      isVegetarian: false,
    },
  ],

  'The Rustic Olive': [
    {
      name: 'Artisanal Quattro Formaggi Pizza',
      description: 'Hand-tossed crust with mozzarella, gorgonzola, fontina, and parmigiano-reggiano cheeses.',
      price: 320,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Spicy Diavola Pepperoni Pizza',
      description: 'Classic wood-fired pizza with San Marzano tomato sauce, spicy pepperoni slices, and chili flakes.',
      price: 340,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Gourmet Italian Beef & Cheese Burger',
      description: 'Seared beef patty topped with smoked provolone, caramelized balsamic onions, and truffle aioli.',
      price: 260,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Classic Venetian Tiramisu Cake Slice',
      description: 'Espresso-soaked ladyfinger sponge layered with light mascarpone cream and dusted with Dutch cocoa.',
      price: 160,
      category: 'Dessert',
      isVegetarian: true,
    },
  ],

  'Hotel Suprabha Pure Veg': [
    {
      name: 'Crispy Punjabi Ghee Samosa (2 pcs)',
      description: 'Flaky crust samosas fried in pure ghee, stuffed with spiced potatoes and cashews, served with mint and date chutneys.',
      price: 60,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Eggless Pineapple Cream Cake Slice',
      description: 'Delicate sponge cake infused with fresh pineapple crush and whipped non-dairy cream.',
      price: 110,
      category: 'Dessert',
      isVegetarian: true,
    },
    {
      name: 'Bombay Masala Veg Frankie Rolls',
      description: 'Grilled roti roll filled with spiced potato rolls, chopped onions, and special frankie masala.',
      price: 120,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Crispy Paneer Chilli Dry (Chinese)',
      description: 'Cottage cheese fingers tossed with bell peppers, green chilies, and tangy soy glaze.',
      price: 210,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Steamed Corn & Cheese Momo (6 pcs)',
      description: 'Himalayan steamed dumplings filled with sweet corn kernels and melted cheddar cheese.',
      price: 140,
      category: 'Appetizer',
      isVegetarian: true,
    },
  ],

  'Shiva Jyothi Dhaba': [
    {
      name: 'Dhaba Style Double Egg Chicken Rolls',
      description: 'Crispy flaky tandoori laccha paratha with egg coating and spicy chicken tikka pieces.',
      price: 150,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Highway Samosa Chaat Platter',
      description: 'Fresh hot samosas crushed and smothered in spicy desi chana masala, curd, and chopped coriander.',
      price: 75,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Dhaba Special Chicken Fried Rice (Chinese)',
      description: 'Wok-charred basmati rice stir-fried with shredded chicken, eggs, and garlic chili oil.',
      price: 220,
      category: 'Main Course',
      isVegetarian: false,
    },
  ],

  'Kakatiya Deluxe Mess': [
    {
      name: 'Telangana Spiced Onion Samosa (4 pcs)',
      description: 'Crisp paper-thin samosas stuffed with caramelized spiced onions, poha, and green chilies.',
      price: 60,
      category: 'Appetizer',
      isVegetarian: true,
    },
  ],

  'Sakura Zen': [
    {
      name: 'Authentic Japanese Gyoza Momos (6 pcs)',
      description: 'Pan-fried Japanese dumplings with crisp golden bottoms filled with minced chicken, cabbage, and scallions.',
      price: 220,
      category: 'Appetizer',
      isVegetarian: false,
    },
    {
      name: 'Wok-Seared Asian Garlic Noodles (Chinese)',
      description: 'Springy egg noodles tossed with minced garlic, dark soy, chili oil, and toasted sesame.',
      price: 210,
      category: 'Main Course',
      isVegetarian: true,
    },
  ],
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    let totalItemsAdded = 0;

    for (const [restaurantName, items] of Object.entries(newItemsByRestaurant)) {
      const restaurant = await Restaurant.findOne({ name: restaurantName });
      if (!restaurant) {
        console.warn(`Restaurant not found: ${restaurantName}`);
        continue;
      }

      let addedForThis = 0;
      for (const item of items) {
        // Avoid duplicate items by name
        const alreadyExists = restaurant.menuItems.some(
          (m) => m.name.toLowerCase() === item.name.toLowerCase()
        );

        if (!alreadyExists) {
          restaurant.menuItems.push(item);
          addedForThis++;
          totalItemsAdded++;
        }
      }

      if (addedForThis > 0) {
        await restaurant.save();
        console.log(`✓ Added ${addedForThis} new items to [${restaurant.name}]. Total menu items now: ${restaurant.menuItems.length}`);
      } else {
        console.log(`- All items already present for [${restaurant.name}]`);
      }
    }

    console.log(`\n======================================================`);
    console.log(`Successfully added ${totalItemsAdded} total menu items into MongoDB!`);
    console.log(`======================================================\n`);

    process.exit(0);
  } catch (err) {
    console.error('Error adding popular food items:', err);
    process.exit(1);
  }
})();
