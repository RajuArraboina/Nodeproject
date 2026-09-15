const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');


router.route('/')
  .get(getAllRestaurants)
  .post(protect, createRestaurant);


router.route('/createRestaurant')
  .get((req, res) => {
    res.status(200).json({
      message: 'To create a restaurant, send an HTTP POST request to this URL with a JSON body and Bearer token.',
      method: 'POST',
      url: '/api/restaurants',
      headers: { Authorization: 'Bearer <your_jwt_token>' },
      sampleBody: {
        name: 'The Golden Spoon',
        cuisine: 'Continental',
        description: 'Finest gourmet dining experience',
        rating: 4.7,
      },
    });
  })
  .post(protect, createRestaurant);

router.route('/updateRestaurant/:id')
  .put(protect, updateRestaurant)
  .post(protect, updateRestaurant)
  .patch(protect, updateRestaurant);

router.route('/deleteRestaurant/:id')
  .delete(protect, deleteRestaurant)
  .post(protect, deleteRestaurant)
  .get(protect, deleteRestaurant);

router.route('/getAllRestaurants')
  .get(getAllRestaurants);

router.route('/getRestaurant/:id')
  .get(getRestaurantById);


router.route('/:id')
  .get(getRestaurantById)
  .put(protect, updateRestaurant)
  .delete(protect, deleteRestaurant);

module.exports = router;
