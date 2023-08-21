const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant created sucessfully',
    restaurant,
  });
});

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Review,
      },
    ],
  });

  if (!restaurants) {
    return next(new AppError('Restaurants not found', 400));
  }

  return res.status(200).json({
    status: 'success',
    restaurants,
  });
});

exports.getRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Update restaurant successfully',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  await restaurant.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'Delete restaurant successfully',
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const { restaurant, sessionUser } = req;
  const { comment, rating } = req.body;

  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: restaurant.id,
    rating,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Review created successfully',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser, review } = req;

  if (review.userId !== sessionUser.id) {
    return next(new AppError('Update of this review not allowed', 400));
  }

  await review.update({
    comment,
    rating,
  });

  return res.status(400).json({
    status: 'success',
    message: 'Update review successfully',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { sessionUser, review } = req;

  if (review.userId !== sessionUser.id) {
    return next(new AppError('Update of this review not allowed', 400));
  }

  await review.update({
    status: 'disabled',
  });

  return res.status(400).json({
    status: 'success',
    message: 'Delete review successfully',
  });
});
