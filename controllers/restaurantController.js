const Restaurant = require('../models/restaurantModel');
const {
  getDefaultMenuItemsByCuisine,
  getDefaultDescriptionByCuisine,
} = require('../utils/menuGenerator');


const getAllRestaurants = async (req, res) => {
  try {
    const { cuisine, search, city } = req.query;
    let query = {};

    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: 'i' };
    }

    if (city) {
      query['address.city'] = { $regex: city, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } },
        { 'address.street': { $regex: search, $options: 'i' } },
      ];
    }

    const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch restaurants',
      error: error.message,
    });
  }
};


const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to fetch restaurant',
      error: error.message,
    });
  }
};


const createRestaurant = async (req, res) => {
  try {
    // If description is missing or empty, auto-generate an authentic description based on cuisine
    if (!req.body.description || req.body.description.trim() === '') {
      req.body.description = getDefaultDescriptionByCuisine(req.body.name, req.body.cuisine);
    }

    // If no menu items provided or empty array, automatically generate menu items based on cuisine
    if (
      !req.body.menuItems ||
      !Array.isArray(req.body.menuItems) ||
      req.body.menuItems.length === 0
    ) {
      req.body.menuItems = getDefaultMenuItemsByCuisine(req.body.cuisine);
    }

    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      message: `Restaurant created successfully with ${newRestaurant.menuItems.length} automatic menu items`,
      data: newRestaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation Error: Failed to create restaurant',
      error: error.message,
    });
  }
};


const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update restaurant',
      error: error.message,
    });
  }
};


const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to delete restaurant',
      error: error.message,
    });
  }
};



const autoGenerateRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.params.id} not found`,
      });
    }
    constdefaultItems = getDefaultMenuItemsByCuisine(restaurant.cuisine);

    if (req.body && req.body.overwrite === true) {
      restaurant.menuItems = defaultItems;
    } else if (!restaurant.menuItems || restaurant.menuItems.length === 0) {
      restaurant.menuItems = defaultItems;
    } else {
      restaurant.menuItems.push(...defaultItems);
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: `Successfully auto-generated ${defaultItems.length} menu items for '${restaurant.name}'`,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to auto-generate menu items',
      error: error.message,
    });
  }
};


const autoGenerateAllMenus = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    let updatedCount = 0;

    for (const restaurant of restaurants) {
      if (
        !restaurant.menuItems ||
        restaurant.menuItems.length === 0 ||
        (req.body && req.body.force === true)
      ) {
        restaurant.menuItems = getDefaultMenuItemsByCuisine(restaurant.cuisine);
        await restaurant.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Successfully auto-generated menu items for ${updatedCount} restaurants`,
      totalRestaurants: restaurants.length,
      updatedRestaurants: updatedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to auto-generate menu items for all restaurants',
      error: error.message,
    });
  }
};



const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, isVegetarian } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and price for the menu item',
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.params.id} not found`,
      });
    }

    const newItem = {
      name,
      description: description || '',
      price: Number(price),
      category: category || 'Main Course',
      isVegetarian: Boolean(isVegetarian),
    };

    restaurant.menuItems.push(newItem);
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: `Menu item '${name}' added successfully to '${restaurant.name}'`,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add menu item',
      error: error.message,
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.params.id} not found`,
      });
    }

    const initialLength = restaurant.menuItems.length;
    restaurant.menuItems = restaurant.menuItems.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    if (restaurant.menuItems.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${req.params.itemId} not found`,
      });
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete menu item',
      error: error.message,
    });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  autoGenerateRestaurantMenu,
  autoGenerateAllMenus,
  addMenuItem,
  deleteMenuItem,
};
