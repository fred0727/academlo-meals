const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Restaurant = require('../models/restaurant.model');

exports.validateMeal = catchAsync(async (req, res, next) => {
  /* valor a retornar */
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'name', 'address', 'rating'],
      },
    ],
  });

  if (!meal) {
    next(new AppError('Meal not found', 404));
  }

  req.meal = meal;
  next();
});
