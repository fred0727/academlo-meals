const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const mealController = require('../controllers/meal.controller');
const mealMiddleware = require('../middlewares/meal.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');

const router = express.Router();

router.get('/', mealController.getAllMeals);
router.get('/:id', mealMiddleware.validateMeal, mealController.getMeal);

router.use(authMiddleware.protect);
router.use(authMiddleware.restricTo('admin'));

router.post(
  '/:id',
  restaurantMiddleware.validateRestaurant,
  validationMiddleware.creatMealValidation,
  mealController.createMeal
);

router
  .use('/:id', mealMiddleware.validateMeal)
  .route('/:id')
  .patch(validationMiddleware.updateMealValidation, mealController.updateMeal)
  .delete(mealController.deleteMeal);

module.exports = router;
