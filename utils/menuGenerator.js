/**
 * Utility to generate curated menu items based on restaurant cuisine
 */
const getDefaultMenuItemsByCuisine = (cuisine = '') => {
  const norm = String(cuisine).trim().toLowerCase();

  if (norm.includes('indian') || norm.includes('india')) {
    return [
      {
        name: 'Crispy Vegetable Samosas (3 pcs)',
        description: 'Golden fried savory pastries stuffed with spiced potatoes, green peas, and served with tangy tamarind and mint chutney.',
        price: 7.99,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Succulent cubes of Indian cottage cheese simmered in a creamy tomato, butter, and cashew nut gravy.',
        price: 15.99,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Royal Chicken Dum Biryani',
        description: 'Slow-cooked aromatic basmati rice infused with saffron, caramelized onions, tender marinated chicken, and exotic spices.',
        price: 18.50,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Tandoori Garlic Butter Naan',
        description: 'Traditional clay oven baked leavened flatbread brushed with fresh minced garlic, cilantro, and pure butter.',
        price: 4.50,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Gulab Jamun with Warm Rabdi',
        description: 'Soft melt-in-mouth milk solid dumplings steeped in cardamom rose syrup, served with creamy condensed milk.',
        price: 6.99,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Classic Mango Lassi',
        description: 'Creamy chilled probiotic yogurt blended with sweet Alphonso mango pulp and a hint of cardamom.',
        price: 4.99,
        category: 'Beverage',
        isVegetarian: true,
      },
    ];
  }

  if (norm.includes('mughlai')) {
    return [
      {
        name: 'Murgh Malai Kebab',
        description: 'Boneless chicken thighs marinated in heavy cream, hung curd, grated cheese, and mild royal spices, flame-grilled to perfection.',
        price: 15.99,
        category: 'Appetizer',
        isVegetarian: false,
      },
      {
        name: 'Shahi Mughlai Paneer Korma',
        description: 'Rich royal cottage cheese curry simmered in a velvety white gravy made of ground cashews, almonds, and saffron.',
        price: 16.99,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Lucknowi Dum Gosht Mutton Biryani',
        description: 'Tender baby goat pieces cooked on dum with aged basmati rice, rose water, kewra, and fragrant Lucknowi spices.',
        price: 22.00,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Khamiri Roti',
        description: 'Traditional yeast-leavened soft Mughlai bread baked in tandoor, historically savored in Mughal courts.',
        price: 4.00,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Royal Shahi Tukda',
        description: 'Crisp golden fried ghee-toasted bread soaked in saffron syrup, layered with thick saffron rabdi and silver vark.',
        price: 7.99,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Rose Badam Sharbat',
        description: 'Refreshing chilled almond milk infused with organic Damascus rose essence and crushed pistachios.',
        price: 5.50,
        category: 'Beverage',
        isVegetarian: true,
      },
    ];
  }

  if (norm.includes('italian')) {
    return [
      {
        name: 'Bruschetta al Pomodoro & Basilico',
        description: 'Grilled artisanal rustic sourdough topped with diced vine-ripened tomatoes, sweet basil, garlic, and aged Modena balsamic.',
        price: 9.50,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Handcrafted Truffle Tagliatelle',
        description: 'Fresh homemade egg tagliatelle pasta gently tossed in a creamy emulsion of black summer truffles and 24-month Parmigiano.',
        price: 24.50,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Neapolitan Wood-Fired Margherita',
        description: 'Authentic thin crust pizza with San Marzano tomatoes, fresh buffalo mozzarella, aromatic basil leaves, and EVOO.',
        price: 18.00,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Classic Venetian Tiramisu',
        description: 'Espresso and liqueur-soaked savoiardi ladyfingers layered with airy whipped mascarpone and dusted with Dutch cocoa.',
        price: 8.99,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'San Pellegrino Sparkling Mineral Water',
        description: 'Crisp Italian natural sparkling mineral water served chilled with fresh Sicilian lemon slices.',
        price: 4.50,
        category: 'Beverage',
        isVegetarian: true,
      },
    ];
  }

  if (norm.includes('japanese') || norm.includes('sushi') || norm.includes('asian')) {
    return [
      {
        name: 'Truffle Salted Edamame',
        description: 'Steamed young tender soybeans in their pod, tossed with coarse Maldon sea salt and fragrant white truffle oil.',
        price: 7.50,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Signature Dragon Roll (8 pcs)',
        description: 'Crispy tempura tiger shrimp rolled with Japanese cucumber, draped with ripe avocado slices, unagi glaze, and tobiko.',
        price: 18.99,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Rich Tonkotsu Black Garlic Ramen',
        description: '14-hour simmered creamy pork bone broth with springy handmade noodles, tender chashu pork belly, ajitsuke tamago, and nori.',
        price: 17.50,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Artisan Matcha Mochi Trio',
        description: 'Sweet chewy Japanese rice cakes filled with premium Kyoto matcha green tea gelato and sweet red bean paste.',
        price: 7.50,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Iced Genmaicha Roasted Brown Rice Tea',
        description: 'Traditional Japanese green tea blended with roasted brown rice, refreshing with a pleasant nutty aroma.',
        price: 4.50,
        category: 'Beverage',
        isVegetarian: true,
      },
    ];
  }

  if (norm.includes('mexican')) {
    return [
      {
        name: 'Tableside Fresh Guacamole & Chips',
        description: 'Freshly mashed Haas avocados mixed with lime juice, minced jalapeños, red onion, cilantro, and warm crisp corn totopos.',
        price: 9.00,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Carne Asada Street Tacos (3 pcs)',
        description: 'Citrus-marinated flame-grilled skirt steak in soft double corn tortillas, topped with fresh cilantro, diced onion, and salsa verde.',
        price: 15.50,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Roasted Poblano & Sweet Corn Enchiladas',
        description: 'Corn tortillas filled with roasted poblano peppers, sweet corn, and Oaxaca cheese, smothered in savory green tomatillo sauce.',
        price: 14.50,
        category: 'Main Course',
        isVegetarian: true,
      },
      {
        name: 'Cinnamon Sugar Churros with Cajeta',
        description: 'Golden, crispy fried Mexican churros rolled in fragrant cinnamon sugar, paired with rich goat milk caramel dipping sauce.',
        price: 7.50,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Authentic Horchata Fresca',
        description: 'Traditional creamy chilled rice and almond milk beverage infused with Mexican canela cinnamon and pure cane sugar.',
        price: 4.50,
        category: 'Beverage',
        isVegetarian: true,
      },
    ];
  }

  if (norm.includes('mediterranean') || norm.includes('seafood')) {
    return [
      {
        name: 'Silky Tahini Hummus & Stone-Baked Pita',
        description: 'Velvety chickpea and roasted garlic dip drizzled with extra virgin Greek olive oil, toasted pine nuts, and warm fresh pita.',
        price: 8.50,
        category: 'Appetizer',
        isVegetarian: true,
      },
      {
        name: 'Pan-Seared Mediterranean Sea Bass',
        description: 'Crisp-skinned wild sea bass fillet served with kalamata olives, blistered cherry tomatoes, caperberries, and lemon herb emulsion.',
        price: 26.00,
        category: 'Main Course',
        isVegetarian: false,
      },
      {
        name: 'Greek Island Village Salad',
        description: 'Heirloom tomatoes, crisp Persian cucumbers, red onion, kalamata olives, and a slab of barrel-aged Greek feta dressed with oregano and olive oil.',
        price: 12.50,
        category: 'Side',
        isVegetarian: true,
      },
      {
        name: 'Crispy Pistachio & Walnut Baklava',
        description: 'Delicate layers of buttered filo pastry packed with roasted pistachios and walnuts, sweetened with orange blossom honey syrup.',
        price: 8.50,
        category: 'Dessert',
        isVegetarian: true,
      },
      {
        name: 'Fresh Mint & Pomegranate Sparkler',
        description: 'Chilled sparkling tonic infused with crushed spearmint leaves, fresh lime juice, and tart pomegranate reduction.',
        price: 5.00,
        category: 'Beverage',
        isVegetarian: true,
      },
    ];
  }

  // Fallback for Continental / International / General
  return [
    {
      name: 'Chef’s Artisanal Bruschetta',
      description: 'Grilled crusty baguette slices topped with balsamic-marinated heirloom tomatoes, fragrant sweet basil, and aged parmesan.',
      price: 8.99,
      category: 'Appetizer',
      isVegetarian: true,
    },
    {
      name: 'Signature Gourmet Truffle Burger',
      description: 'Char-grilled prime beef patty topped with melted aged cheddar, caramelized balsamic onions, arugula, and black truffle garlic aioli.',
      price: 17.99,
      category: 'Main Course',
      isVegetarian: false,
    },
    {
      name: 'Creamy Forest Mushroom Risotto',
      description: 'Slow-simmered Carnaroli rice with porcini and cremini mushrooms, white wine, thyme, and finely shaved Parmigiano-Reggiano.',
      price: 18.50,
      category: 'Main Course',
      isVegetarian: true,
    },
    {
      name: 'Warm Belgian Chocolate Lava Cake',
      description: 'Decadent molten dark chocolate center encased in tender chocolate sponge, served with a scoop of Madagascar vanilla bean gelato.',
      price: 9.00,
      category: 'Dessert',
      isVegetarian: true,
    },
    {
      name: 'House Craft Citrus Lemonade',
      description: 'Freshly squeezed Meyer lemons mixed with sparkling water, a hint of fresh rosemary, and pure agave nectar.',
      price: 4.50,
      category: 'Beverage',
      isVegetarian: true,
    },
  ];
};

/**
 * Utility to generate engaging, professional descriptions based on restaurant cuisine
 */
const getDefaultDescriptionByCuisine = (name = '', cuisine = '') => {
  const norm = String(cuisine).trim().toLowerCase();
  const restName = name ? name.trim() : 'Our restaurant';

  if (norm.includes('indian') || norm.includes('india')) {
    return `${restName} offers an authentic Indian dining experience featuring rich flavorful curries, traditional tandoori grills, and aromatic dum biryanis prepared with pure spices.`;
  }
  if (norm.includes('mughlai')) {
    return `${restName} is a royal Mughlai kitchen celebrated for melt-in-mouth kebabs, slow-cooked saffron-infused curries, and traditional Dum Gosht biryanis.`;
  }
  if (norm.includes('italian')) {
    return `${restName} serves authentic Italian cuisine, handcrafted fresh pastas, and wood-fired pizzas prepared with fresh organic ingredients and imported cheeses.`;
  }
  if (norm.includes('japanese') || norm.includes('sushi') || norm.includes('asian')) {
    return `${restName} delivers an exquisite Japanese culinary experience featuring fresh sashimi, mastercrafted sushi rolls, and rich 14-hour simmered ramen bowls.`;
  }
  if (norm.includes('mexican')) {
    return `${restName} brings vibrant Mexican street flavors to life with handmade corn tortillas, slow-marinated meats, fresh guacamole, and signature house salsas.`;
  }
  if (norm.includes('mediterranean') || norm.includes('seafood')) {
    return `${restName} presents fresh coastal Mediterranean specialties, pan-seared ocean catches, wholesome mezze spreads, and fine wines in a relaxed seaside ambiance.`;
  }
  return `${restName} provides an exceptional gourmet dining atmosphere with seasonal market ingredients, handcrafted specialties, and warm hospitality.`;
};

module.exports = {
  getDefaultMenuItemsByCuisine,
  getDefaultDescriptionByCuisine,
};
