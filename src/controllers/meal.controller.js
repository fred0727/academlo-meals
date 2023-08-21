const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Meal created successfully',
    meal,
  });
});

exports.getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'name', 'address', 'rating'],
      },
    ],
  });

  if (!meals) {
    return next(new AppError('Meals not founds', 400));
  }

  return res.status(200).json({
    status: 'success',
    meals,
  });
});

exports.getMeal = catchAsync(async (req, res) => {
  const { meal } = req;

  return res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  return res.status(200).json({
    status: 'succcess',
    message: 'Updated meal successfully',
  });
});

exports.deleteMeal = catchAsync(async (req, res) => {
  const { meal } = req;

  await meal.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'succcess',
    message: 'Delete meal successfully',
  });
});
