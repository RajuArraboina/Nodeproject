const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('../models/restaurantModel');

const tiffinsByRestaurant = {
  'Hotel Suprabha Pure Veg': [
    {
      name: 'Steamed Ghee Button Sambar Idli (12 pcs) - Tiffins',
      description: 'Miniature soft steamed rice cakes drowned in piping-hot drumstick sambar and drizzled with pure desi ghee.',
      price: 75,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Traditional Thatte Idli with Gunpowder Podi - Tiffins',
      description: 'Plate-sized fluffy Karnataka style thatte idli smeared with spicy molagapodi and generous melted ghee.',
      price: 65,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Warangal Special Karam Dosa - Tiffins',
      description: 'Crispy golden dosa roasted in ghee, smeared with spicy red garlic-chili paste and roasted gram podi.',
      price: 90,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Ghee Onion Rava Dosa - Tiffins',
      description: 'Super-crisp semolina crepe studded with finely chopped onions, green chilies, ginger, and cumin seeds.',
      price: 95,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'MLA Pesarattu with Upma & Allam Chutney - Tiffins',
      description: 'Authentic whole green moong dal crepe stuffed with hot ginger rava upma, served with sweet-spicy allam chutney.',
      price: 110,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Hot Fluffy Poori Bhaji (3 pcs) - Tiffins',
      description: 'Golden puffed whole-wheat pooris served with traditional spiced potato-onion curry and coconut chutney.',
      price: 75,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Medu Vada (3 pcs) with Sambar - Tiffins',
      description: 'Golden crispy urad dal donuts tempered with crushed peppercorns, served with fresh coconut chutney and hot sambar.',
      price: 65,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Hot Mysore Bonda (4 pcs) - Tiffins',
      description: 'Crispy on the outside, fluffy and pillowy on the inside fried dumplings served with spicy ginger chutney.',
      price: 60,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Ghee Hot Ven Pongal (Khara Bath) - Tiffins',
      description: 'Classic temple-style mashed rice and yellow moong dal cooked with crushed black pepper, cumin, and roasted cashews in pure ghee.',
      price: 80,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Onion Tomato Uttapam - Tiffins',
      description: 'Thick fermented rice pancake topped with fresh diced tomatoes, onions, green chilies, and cilantro.',
      price: 85,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Degree Filter Coffee - Tiffins',
      description: 'Freshly brewed aromatic South Indian chicory coffee frothed with boiling whole milk, served in brass dabarah.',
      price: 35,
      category: 'Beverage',
      isVegetarian: true,
    },
  ],

  'Kakatiya Deluxe Mess': [
    {
      name: 'Classic Steamed Idli (3 pcs) with 3 Chutneys - Tiffins',
      description: 'Soft, melt-in-mouth steamed fermented rice cakes served with peanut chutney, allam chutney, and spicy sambar.',
      price: 50,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Butter Masala Dosa - Tiffins',
      description: 'Crispy golden dosa roasted with butter, stuffed with fragrant potato bhaji, served with coconut chutney.',
      price: 85,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Andhra Onion Pesarattu with Ginger Chutney - Tiffins',
      description: 'Nutritious green gram crepe topped with caramelized onions and green chilies, accompanied by tangy allam pachadi.',
      price: 85,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Sambar Vada Dip (2 pcs) - Tiffins',
      description: 'Freshly fried hot medu vadas dipped in flavorful drumstick and shallot sambar with a spoonful of ghee.',
      price: 60,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Puri Kurma (3 pcs) - Tiffins',
      description: 'Deep-fried puffed pooris served with spicy South Indian vegetable kurma and onion slices.',
      price: 70,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Warangal Street Mirchi Bajji (3 pcs) - Tiffins',
      description: 'Long green bhavnagri chilies deep-fried in seasoned gram flour batter, slit and stuffed with chopped onions, lime juice, and chaat podi.',
      price: 50,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Ghee Rava Upma with Groundnut Pachadi - Tiffins',
      description: 'Fluffy roasted semolina upma tempered with mustard, roasted chana dal, curry leaves, and green chilies in pure ghee.',
      price: 55,
      category: 'Main Course',
      isVegetarian: true,
    },
  ],

  'Grand Gayathri Restaurant': [
    {
      name: 'Mysore Masala Dosa with Red Chutney - Tiffins',
      description: 'Crispy dosa with a layer of fiery spicy Mysore red chutney and stuffed with spiced potato masala.',
      price: 95,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Steamed Sambar Idli & Vada Combo - Tiffins',
      description: 'One crispy medu vada and two soft idlis immersed in steaming hot lentil sambar, garnished with fresh cilantro.',
      price: 80,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Chole Bhature / Chola Poori (2 pcs) - Tiffins',
      description: 'Large puffed golden bhaturas served with Punjabi spiced chickpea masala, pickled carrots, and green chili.',
      price: 130,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Ghee Podi Dosa - Tiffins',
      description: 'Crispy crepe dusted with gunpowder lentil podi and roasted with bubbling pure desi ghee.',
      price: 90,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Curd Vada / Perugu Vada (2 pcs) - Tiffins',
      description: 'Soft lentil vadas soaked in chilled seasoned creamy curd, tempered with mustard seeds and curry leaves.',
      price: 75,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Podi Ghee Uttapam - Tiffins',
      description: 'Fluffy thick fermented rice pancake coated in spicy gunpowder podi and pure ghee.',
      price: 90,
      category: 'Main Course',
      isVegetarian: true,
    },
  ],

  'kings': [
    {
      name: 'Ghee Roast Masala Dosa - Tiffins',
      description: 'Signature crispy thin crepe roasted in generous clarified butter, stuffed with spiced potato and peas.',
      price: 85,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Steamed Idli Sambar (3 pcs) - Tiffins',
      description: 'Soft and spongy rice idlis served with vegetable sambar, coconut chutney, and spicy tomato chutney.',
      price: 55,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Medu Vada (2 pcs) with Chutneys - Tiffins',
      description: 'Golden fried savory lentil donuts served hot with freshly ground coconut and tomato chutneys.',
      price: 55,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Hot Poori Masala (3 pcs) - Tiffins',
      description: 'Fluffy fried whole-wheat pooris accompanied by spiced potato masala curry.',
      price: 70,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Mysore Bonda Plate (4 pcs) - Tiffins',
      description: 'Crisp, golden-brown fried bondas served with tangy coconut-chili chutney.',
      price: 60,
      category: 'Appetizer',
      isVegetarian: true,
    },
  ],

  'Rmaya Restaurant': [
    {
      name: 'Special Ghee Masala Dosa - Tiffins',
      description: 'Traditional South Indian crispy dosa filled with seasoned mashed potatoes, served with coconut chutney.',
      price: 80,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Steamed Idli & Crispy Vada Combo - Tiffins',
      description: 'Two fluffy idlis and one crispy vada served with hot sambar and freshly ground peanut chutney.',
      price: 70,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Fluffy Poori Bhaji (3 pcs) - Tiffins',
      description: 'Freshly fried puffed pooris served with potato curry and sliced raw onions.',
      price: 65,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Onion Rava Dosa - Tiffins',
      description: 'Thin crispy semolina crepe cooked with diced onions and green chilies.',
      price: 85,
      category: 'Main Course',
      isVegetarian: true,
    },
  ],

  'SR Restaurant': [
    {
      name: 'Butter Paper Dosa - Tiffins',
      description: 'Ultra-thin, paper-crisp dosa roasted in pure butter, served with rich coconut chutney and sambar.',
      price: 85,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Ghee Sambar Idli (2 pcs) - Tiffins',
      description: 'Soft steamed idlis steeped in thick, aromatic sambar with a spoonful of melted ghee.',
      price: 60,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Medu Vada (2 pcs) - Tiffins',
      description: 'Deep-fried savory black gram donuts with crispy exterior and soft fluffy interior.',
      price: 55,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Hot Poori with Aloo Kurma - Tiffins',
      description: 'Puffy whole wheat pooris served with spiced aloo kurma and coconut chutney.',
      price: 70,
      category: 'Main Course',
      isVegetarian: true,
    },
  ],

  'Maitrivanam Family Restaurant': [
    {
      name: 'Warangal Karam Dosa with Ghee - Tiffins',
      description: 'Spicy red garlic chili paste spread over crispy golden dosa, topped with roasted gram podi and pure ghee.',
      price: 90,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Steamed Idli (3 pcs) with Peanut Chutney - Tiffins',
      description: 'Classic steamed rice cakes served with Telangana-style roasted peanut chutney and sambar.',
      price: 50,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Crispy Sambar Vada Dip (2 pcs) - Tiffins',
      description: 'Lentil vadas soaked in hot lentil and vegetable stew with a touch of ghee.',
      price: 65,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Mysore Bonda (4 pcs) with Allam Chutney - Tiffins',
      description: 'Puffy golden fritters made with seasoned batter, served with spicy sweet allam pachadi.',
      price: 60,
      category: 'Appetizer',
      isVegetarian: true,
    },
  ],

  'Shiva Jyothi Dhaba': [
    {
      name: 'Highway Special Chole Bhature / Chola Poori (2 pcs) - Tiffins',
      description: 'Large golden fried bhaturas served with rich Punjabi chole masala, pickled onions, and green chilies.',
      price: 120,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Masala Poori Bhaji (4 pcs) - Tiffins',
      description: 'Crisp hot pooris with spicy roadside aloo bhaji and fried green chilies.',
      price: 75,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Desi Ghee Masala Dosa - Tiffins',
      description: 'Crisp dosa prepared on traditional iron tawa with spiced potato filling and mint chutney.',
      price: 80,
      category: 'Main Course',
      isVegetarian: true,
    },
  ],
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    let totalTiffinsAdded = 0;

    for (const [restaurantName, items] of Object.entries(tiffinsByRestaurant)) {
      const restaurant = await Restaurant.findOne({ name: restaurantName });
      if (!restaurant) {
        console.warn(`Restaurant not found: ${restaurantName}`);
        continue;
      }

      let countForThis = 0;
      for (const item of items) {
        const alreadyExists = restaurant.menuItems.some(
          (m) => m.name.toLowerCase() === item.name.toLowerCase()
        );

        if (!alreadyExists) {
          restaurant.menuItems.push(item);
          countForThis++;
          totalTiffinsAdded++;
        }
      }

      if (countForThis > 0) {
        await restaurant.save();
        console.log(`✓ Added ${countForThis} tiffins to [${restaurant.name}]. Total menu items now: ${restaurant.menuItems.length}`);
      } else {
        console.log(`- Tiffins already exist in [${restaurant.name}]`);
      }
    }

    console.log('\n======================================================');
    console.log(`Successfully added ${totalTiffinsAdded} authentic Tiffin items to MongoDB Atlas!`);
    console.log('======================================================\n');

    process.exit(0);
  } catch (err) {
    console.error('Error adding tiffins:', err);
    process.exit(1);
  }
})();
