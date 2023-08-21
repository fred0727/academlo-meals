const express = require('express');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const restaurantController = require('../controllers/restaurant.controller');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');

const router = express.Router();

router.get('/', restaurantController.getAllRestaurants);
router.get(
  '/:id',
  restaurantMiddleware.validateRestaurant,
  restaurantController.getRestaurant
);

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id/',
  restaurantMiddleware.validateRestaurant,
  validationMiddleware.createReviewValidation,
  restaurantController.createReview
);

router
  .use(
    '/reviews/:id/:reviewId',
    restaurantMiddleware.validateRestaurant,
    restaurantMiddleware.validateReview
  )
  .route('/reviews/:id/:reviewId')
  .patch(
    validationMiddleware.updateReviewValidation,
    restaurantController.updateReview
  )
  .delete(restaurantController.deleteReview);

router.use(authMiddleware.restricTo('admin'));

router.post(
  '/',
  validationMiddleware.createRestaurantValidation,
  restaurantController.createRestaurant
);

router
  .use('/:id', restaurantMiddleware.validateRestaurant)
  .route('/:id')
  .patch(
    validationMiddleware.updateRestaurantValidation,
    restaurantController.updateRestaurant
  )
  .delete(restaurantController.deleteRestaurant);

module.exports = router;
