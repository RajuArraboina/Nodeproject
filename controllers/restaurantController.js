const Restaurant = require('../models/restaurantModel');


const getAllRestaurants = async (req, res) => {
  try {
    const { cuisine, search } = req.query;
    let query = {};

    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
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
    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
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

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
