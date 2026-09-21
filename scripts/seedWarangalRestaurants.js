const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('../models/restaurantModel');

const warangalRestaurants = [
  {
    name: 'Kakatiya Deluxe Mess',
    cuisine: 'Telangana & South Indian',
    description: "Warangal's legendary culinary landmark celebrated for fiery Telangana natukodi pulusu, spicy mutton curry, and unlimited traditional thalis.",
    address: {
      street: 'Subedari, Near Collectorate',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506001',
    },
    phone: '+91 870 245 6789',
    email: 'kakatiyamess@gmail.com',
    rating: 4.8,
    isOpen: true,
    menuItems: [
      {
        name: 'Telangana Natu Kodi Pulusu',
        description: 'Country chicken simmered in a fiery, rustic Telangana poppy seed and red chili curry.',
        price: 280,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Warangal Mutton Sukka',
        description: 'Tender goat chunks slow-roasted with black pepper, curry leaves, and hand-ground spices.',
        price: 320,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Unlimited Telangana Royal Meals Thali',
        description: 'Served on banana leaf: rice, pappu, sambar, rasam, pachi pulusu, curd, podi, and two veg curries.',
        price: 180,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Gongura Mutton Biryani',
        description: 'Flavorful basmati rice layered with tangy sorrel leaves (gongura) and tender mutton pieces.',
        price: 310,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Ghee Mudda Pappu & Pachi Pulusu',
        description: 'Comforting yellow lentils topped with pure desi ghee paired with cold tamarind rasam.',
        price: 90,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Special Masala Majjiga (Buttermilk)',
        description: 'Chilled churned buttermilk with ginger, green chili, curry leaves, and roasted cumin.',
        price: 40,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Bay Leaf Restaurant (Hotel Ashoka)',
    cuisine: 'North Indian & Mughlai',
    description: 'Upscale fine-dining destination in Warangal known for signature clay-oven kebabs, Hyderabadi dum biryanis, and rich Mughlai curries.',
    address: {
      street: 'Main Road, Hanamkonda',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506001',
    },
    phone: '+91 870 257 8491',
    email: 'bayleaf.ashoka@gmail.com',
    rating: 4.6,
    isOpen: true,
    menuItems: [
      {
        name: 'Zafrani Murgh Malai Tikka',
        description: 'Boneless chicken cubes steeped in cream, melted cheese, and royal saffron, flame-broiled in clay oven.',
        price: 320,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Paneer Tikka Lababdar',
        description: 'Charred paneer cubes simmered in a luscious tomato and cashew butter gravy.',
        price: 260,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Bay Leaf Special Mutton Dum Biryani',
        description: 'Long grain aged basmati rice cooked on dum with marinated mutton and exotic spices.',
        price: 360,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Butter Garlic Naan',
        description: 'Tandoor-baked flatbread brushed with garlic butter and fresh coriander.',
        price: 60,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Royal Shahi Tukda with Rabdi',
        description: 'Crisp fried bread soaked in saffron sugar syrup and topped with thick rabdi.',
        price: 120,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Chilled Fresh Lime Soda',
        description: 'Zesty fresh lime juice with sparkling club soda, rock salt, and mint.',
        price: 70,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Grand Gayathri Restaurant',
    cuisine: 'Multi-Cuisine & Indian',
    description: 'A beloved family restaurant in Nakkalagutta serving decadent North Indian delicacies, sizzlers, and fragrant Hyderabadi biryanis.',
    address: {
      street: 'Nakkalagutta, Hanamkonda',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506001',
    },
    phone: '+91 870 254 1122',
    email: 'grandgayathri.wgl@gmail.com',
    rating: 4.5,
    isOpen: true,
    menuItems: [
      {
        name: 'Crispy Corn Pepper Salt',
        description: 'Golden fried American corn tossed with crushed black pepper, spring onions, and garlic.',
        price: 190,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Gayathri Special Chicken Curry',
        description: 'House signature chef special chicken curry infused with fragrant coriander and cashew paste.',
        price: 290,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Kaju Paneer Biryani',
        description: 'Fragrant basmati rice infused with aromatic spices, fresh paneer, and roasted cashew nuts.',
        price: 280,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Butter Roti Basket',
        description: 'Assorted whole wheat rotis baked fresh in tandoor with generous butter.',
        price: 80,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Gulab Jamun with Vanilla Ice Cream',
        description: 'Hot melt-in-mouth gulab jamuns served with chilled Madagascar vanilla ice cream.',
        price: 110,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Sweet Mango Lassi',
        description: 'Thick churned sweet curd blended with ripe mango pulp and saffron strands.',
        price: 80,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Hotel Suprabha Pure Veg',
    cuisine: 'South Indian & Pure Veg',
    description: "Warangal's foremost pure vegetarian restaurant famous for crispy ghee roast dosas, executive vegetarian thalis, and paneer delicacies.",
    address: {
      street: 'Kazipet Main Road',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506004',
    },
    phone: '+91 870 243 5500',
    email: 'suprabha.veg@gmail.com',
    rating: 4.7,
    isOpen: true,
    menuItems: [
      {
        name: 'Suprabha Special Ghee Paper Roast Dosa',
        description: 'Huge crispy golden crepe roasted in pure ghee, served with 3 signature chutneys and vegetable sambar.',
        price: 95,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Medu Vada Sambar Dip (2 pcs)',
        description: 'Crispy lentil donuts dipped in hot aromatic shallot sambar with coconut chutney.',
        price: 60,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Paneer Kaju Masala',
        description: 'Fresh malai paneer cubes cooked in a rich onion, tomato, and roasted cashew nut gravy.',
        price: 240,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'South Indian Special Executive Meals',
        description: 'Complete South Indian platter with rice, poori, kurma, dal, sambar, rasam, curd, and dessert.',
        price: 160,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Elaneer Payasam (Tender Coconut Kheer)',
        description: 'Traditional creamy dessert prepared with tender coconut pulp, condensed milk, and cardamom.',
        price: 90,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Authentic South Indian Filter Coffee',
        description: 'Freshly brewed aromatic chicory-coffee blend frothed with hot rich milk.',
        price: 35,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Palamuru Grill Warangal',
    cuisine: 'Telangana & Barbecue',
    description: 'Famous rustic barbecue dining celebrated for authentic Telangana pot biryani, bamboo chicken, and fiery clay-pot gravies.',
    address: {
      street: 'Near NIT Warangal, Hanamkonda',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506004',
    },
    phone: '+91 870 246 8877',
    email: 'palamurugrill.wgl@gmail.com',
    rating: 4.7,
    isOpen: true,
    menuItems: [
      {
        name: 'Telangana Bamboo Chicken Roast',
        description: 'Chicken pieces marinated with forest spices, stuffed inside green bamboo stalks, and slow charcoal-roasted.',
        price: 340,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Clay Pot Telangana Mutton Curry',
        description: 'Traditional slow-simmered goat curry cooked in unglazed earthen pots with stone-ground spices.',
        price: 380,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Palamuru Special Pot Biryani',
        description: 'Dum-cooked biryani served piping hot in an earthen matka with spicy salan and onion raita.',
        price: 320,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Jowar Roti (2 pcs)',
        description: 'Hand-patted healthy sorghum flatbread served hot with spicy country podi and ghee.',
        price: 50,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Traditional Junnu (Colostrum Milk Pudding)',
        description: 'Steamed delicacy made from pure cow colostrum milk, jaggery, and crushed black pepper.',
        price: 100,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Spiced Coriander Majjiga',
        description: 'Refreshing traditional village buttermilk infused with chopped coriander, ginger, and curry leaves.',
        price: 45,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Maitrivanam Family Restaurant',
    cuisine: 'Indian & Biryani',
    description: 'Popular dining destination near Kakatiya University known for zesty starters, chicken 65, and signature spicy biryanis.',
    address: {
      street: 'KU Cross Road, Naimnagar',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506009',
    },
    phone: '+91 870 244 9911',
    email: 'maitrivanam.wgl@gmail.com',
    rating: 4.4,
    isOpen: true,
    menuItems: [
      {
        name: 'Telangana Chicken 65',
        description: 'Deep-fried spicy battered chicken morsels tossed with slit green chilies, garlic, and fresh curry leaves.',
        price: 230,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Dragon Paneer',
        description: 'Crispy cottage cheese strips tossed in a spicy, tangy red chili and garlic reduction.',
        price: 210,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Maitrivanam Special Chicken Dum Biryani',
        description: 'Signature aromatic biryani rice cooked with tender spiced chicken, saffron, and fried onions.',
        price: 270,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Methi Chaman Curry',
        description: 'Kashmiri style grated paneer simmered in a luscious spinach and fresh fenugreek leaf gravy.',
        price: 230,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Soft Rumali Roti',
        description: 'Handkerchief-thin bread tossed in the air and baked on an inverted tawa.',
        price: 30,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Chilled Kesar Badam Milk',
        description: 'Rich almond milk enriched with saffron threads, cardamom powder, and sliced nuts.',
        price: 60,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Haveli Multi Cuisine Restaurant',
    cuisine: 'North Indian & Chinese',
    description: 'Grand heritage-themed family restaurant in Warangal offering royal dining ambiance, tandoori platters, and sizzling gravies.',
    address: {
      street: 'Balasamudram, Hanamkonda',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506001',
    },
    phone: '+91 870 250 3344',
    email: 'haveliwarangal@gmail.com',
    rating: 4.5,
    isOpen: true,
    menuItems: [
      {
        name: 'Tandoori Murgh Kebab Platter',
        description: 'Assorted platter of malai tikka, seekh kebab, achari chicken, and hariyali tikka.',
        price: 380,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Crispy Veg Spring Rolls',
        description: 'Thin crispy wonton wrappers filled with seasoned shredded cabbage, carrots, and glass noodles.',
        price: 170,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Murgh Tikka Butter Masala',
        description: 'Tandoor-charred chicken tikka cubes simmered in a creamy tomato and cashew nut makhani gravy.',
        price: 290,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Double Tadka Dal Fry',
        description: 'Yellow arhar lentils tempered twice with cumin seeds, whole dried red chilies, and pure ghee.',
        price: 180,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Royal Matka Kulfi',
        description: 'Traditional slow-reduced milk kulfi with pistachios, served in an authentic earthen pot.',
        price: 80,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Blue Curacao Mocktail',
        description: 'Refreshing citrus mocktail with blue curacao syrup, lemon juice, and chilled Sprite.',
        price: 90,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Subani Mutton Biryani Centre',
    cuisine: 'Hyderabadi & Telangana',
    description: 'Iconic heritage eatery in Warangal famed for deeply spiced firewood dum mutton biryani, bagara rice, and dalcha.',
    address: {
      street: 'Mandi Bazar, Near Railway Station',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506002',
    },
    phone: '+91 870 242 7788',
    email: 'subanibiryanicentre@gmail.com',
    rating: 4.6,
    isOpen: true,
    menuItems: [
      {
        name: 'Subani Special Firewood Mutton Biryani',
        description: 'Legendary firewood slow-cooked dum biryani with succulent bone-in goat meat and fragrant spices.',
        price: 290,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Bagara Rice with Chicken Curry & Dalcha',
        description: 'Traditional wedding style bagara rice served with hearty spicy chicken curry and bottle gourd dalcha.',
        price: 220,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Spicy Mutton Boti Fry',
        description: 'Crisp, spicy stir-fried goat boti with crushed pepper, caramelized onions, and green chilies.',
        price: 240,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Hyderabadi Mirchi Ka Salan',
        description: 'Spicy peanut, sesame, and tamarind gravy with pan-roasted long green chilies.',
        price: 40,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Hyderabadi Double Ka Meetha',
        description: 'Fried bread triangles soaked in warm saffron milk, garnished with dry fruits and khoya.',
        price: 70,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Chilled Rooh Afza Sharbat',
        description: 'Traditional herbal rose syrup blended with chilled milk and sabja (basil) seeds.',
        price: 50,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
  {
    name: 'Shiva Jyothi Dhaba',
    cuisine: 'Dhaba & North Indian',
    description: 'Legendary highway dhaba near Warangal known for open-air seating, smoky tandoori rotis, rich butter chicken, and spicy kadai paneer.',
    address: {
      street: 'Warangal-Hyderabad Highway, Rampur',
      city: 'Warangal',
      state: 'Telangana',
      zipCode: '506151',
    },
    phone: '+91 870 258 9900',
    email: 'shivajyothidhaba@gmail.com',
    rating: 4.4,
    isOpen: true,
    menuItems: [
      {
        name: 'Highway Butter Chicken Handi',
        description: 'Charcoal-grilled chicken tossed in a spicy, buttery gravy made with fresh cream and whole garam masala.',
        price: 310,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Punjabi Kadai Paneer',
        description: 'Paneer cubes tossed in a cast iron wok with fresh bell peppers, onions, and freshly crushed coriander seeds.',
        price: 240,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Clay Oven Tandoori Chicken (Half)',
        description: 'Half chicken marinated in red chili paste, hung yogurt, and mustard oil, roasted crisp in tandoor.',
        price: 240,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Desi Ghee Dal Makhani',
        description: 'Slow-simmered whole black lentils and kidney beans cooked overnight with butter and pure ghee.',
        price: 190,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Hot Butter Tandoori Roti',
        description: 'Crisp whole wheat bread straight from the coal tandoor brushed generously with butter.',
        price: 25,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Punjabi Sweet Malai Lassi',
        description: 'Rich thick yogurt served in an earthen kulhad topped with a dollop of fresh clotted cream (malai).',
        price: 70,
        category: 'Beverage',
        isVegetarian: true,
      },
    ],
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    let addedCount = 0;
    let updatedCount = 0;

    for (const restData of warangalRestaurants) {
      const existing = await Restaurant.findOne({ name: restData.name });
      if (existing) {
        existing.cuisine = restData.cuisine;
        existing.description = restData.description;
        existing.address = restData.address;
        existing.phone = restData.phone;
        existing.email = restData.email;
        existing.rating = restData.rating;
        existing.isOpen = restData.isOpen;
        existing.menuItems = restData.menuItems;
        await existing.save();
        console.log(`✓ Updated existing restaurant: ${restData.name}`);
        updatedCount++;
      } else {
        await Restaurant.create(restData);
        console.log(`+ Created new restaurant: ${restData.name}`);
        addedCount++;
      }
    }

    // Also ensure existing Warangal restaurants have state and city set properly
    await Restaurant.updateOne(
      { name: 'kings' },
      {
        $set: {
          'address.city': 'Warangal',
          'address.state': 'Telangana',
          'address.street': 'Station Road, Near Bus Stand',
          'address.zipCode': '506002',
          phone: '+91 870 244 3322',
          email: 'kings.warangal@gmail.com',
        },
      }
    );

    const totalInWarangal = await Restaurant.countDocuments({ 'address.city': { $regex: 'Warangal', $options: 'i' } });
    const totalOverall = await Restaurant.countDocuments({});

    console.log(`\n==============================================`);
    console.log(`Successfully added: ${addedCount} restaurants`);
    console.log(`Successfully updated: ${updatedCount} restaurants`);
    console.log(`Total restaurants in Warangal: ${totalInWarangal}`);
    console.log(`Total restaurants in Database: ${totalOverall}`);
    console.log(`==============================================\n`);

    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error('Error seeding Warangal restaurants:', err.message);
    if (require.main === module) {
      process.exit(1);
    }
  }
})();

module.exports = { warangalRestaurants };
