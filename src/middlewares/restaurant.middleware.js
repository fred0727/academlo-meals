const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Review = require('../models/review.model');

exports.validateRestaurant = catchAsync(async (req, res, next) => {
  /* valor a retornar */
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Review,
      },
    ],
  });

  if (!restaurant) {
    next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});

exports.validateReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({
    where: {
      id: reviewId,
      status: 'active',
    },
  });

  if (!review) {
    next(new AppError('Restaurant not found', 404));
  }

  req.review = review;
  next();
});
