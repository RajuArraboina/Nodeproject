const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant_db';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route - Pure JSON API Overview
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SR Restaurant Backend REST API with JWT Authentication',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me (Bearer Token Required)',
      },
      restaurants: {
        getAllRestaurants: 'GET /api/restaurants',
        getRestaurantById: 'GET /api/restaurants/:id',
        createRestaurant: 'POST /api/restaurants (Bearer Token Required)',
        updateRestaurant: 'PUT /api/restaurants/:id (Bearer Token Required)',
        deleteRestaurant: 'DELETE /api/restaurants/:id (Bearer Token Required)',
        filterByCuisine: 'GET /api/restaurants?cuisine=Indian',
        searchByNameOrDesc: 'GET /api/restaurants?search=Bistro',
      },
    },
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Convenient root-level aliases
const { registerUser, loginUser } = require('./controllers/authController');
app.post('/register', registerUser);
app.post('/login', loginUser);

const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('./controllers/restaurantController');
const { protect } = require('./middleware/authMiddleware');

app.route('/createRestaurant')
  .get((req, res) => {
    res.status(200).json({
      message: 'To create a restaurant, send an HTTP POST request to /api/restaurants with a JSON body and Bearer token.',
      method: 'POST',
      url: '/api/restaurants',
      headers: { Authorization: 'Bearer <token>' },
    });
  })
  .post(protect, createRestaurant);

app.route('/updateRestaurant/:id')
  .put(protect, updateRestaurant)
  .post(protect, updateRestaurant)
  .patch(protect, updateRestaurant);

app.route('/deleteRestaurant/:id')
  .delete(protect, deleteRestaurant)
  .post(protect, deleteRestaurant)
  .get(protect, deleteRestaurant);

app.route('/getRestaurant/:id')
  .get(getRestaurantById);

app.route('/getAllRestaurants')
  .get(getAllRestaurants);

// 404 Route Handler - Pure JSON
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Connect to MongoDB dynamically
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

// Start Server
app.listen(PORT, () => {
  console.log('\n==============================================');
  console.log(`🚀 REST API Server: http://localhost:${PORT}`);
  console.log(`🔐 Auth API:       http://localhost:${PORT}/api/auth`);
  console.log(`🔗 Restaurants API: http://localhost:${PORT}/api/restaurants`);
  console.log('==============================================\n');
  connectDB();
});

module.exports = app;
