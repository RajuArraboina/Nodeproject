const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  autoGenerateRestaurantMenu,
  autoGenerateAllMenus,
  addMenuItem,
  deleteMenuItem,
} = require('../controllers/restaurantController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.route('/')
  .get(getAllRestaurants)
  .post(protect, authorize('admin'), createRestaurant);


router.route('/createRestaurant')
  .get((req, res) => {
    res.status(200).json({
      message: 'To create a restaurant, send an HTTP POST request to this URL with a JSON body and Bearer token. Admin privileges required.',
      method: 'POST',
      url: '/api/restaurants',
      headers: { Authorization: 'Bearer <your_jwt_token>' },
      sampleBody: {
        name: 'The Golden Spoon',
        cuisine: 'Indian',
        description: 'Finest gourmet dining experience',
        rating: 4.7,
      },
    });
  })
  .post(protect, authorize('admin'), createRestaurant);

// Admin: Auto-generate menus for all restaurants with empty/missing menus
router.post('/auto-generate-all', protect, authorize('admin'), autoGenerateAllMenus);

// Admin: Menu operations for a specific restaurant
router.post('/:id/menu/auto-generate', protect, authorize('admin'), autoGenerateRestaurantMenu);
router.post('/:id/menu', protect, authorize('admin'), addMenuItem);
router.delete('/:id/menu/:itemId', protect, authorize('admin'), deleteMenuItem);

// Convenient aliases
router.post('/autoMenu/:id', protect, authorize('admin'), autoGenerateRestaurantMenu);
router.post('/addMenuItem/:id', protect, authorize('admin'), addMenuItem);
router.delete('/deleteMenuItem/:id/:itemId', protect, authorize('admin'), deleteMenuItem);

router.route('/updateRestaurant/:id')
  .put(protect, authorize('admin'), updateRestaurant)
  .post(protect, authorize('admin'), updateRestaurant)
  .patch(protect, authorize('admin'), updateRestaurant);

router.route('/deleteRestaurant/:id')
  .delete(protect, authorize('admin'), deleteRestaurant)
  .post(protect, authorize('admin'), deleteRestaurant)
  .get(protect, authorize('admin'), deleteRestaurant);

router.route('/getAllRestaurants')
  .get(getAllRestaurants)
  .post(getAllRestaurants);

router.route('/getRestaurant/:id')
  .get(getRestaurantById);


router.route('/:id')
  .get(getRestaurantById)
  .put(protect, authorize('admin'), updateRestaurant)
  .delete(protect, authorize('admin'), deleteRestaurant);

module.exports = router;
