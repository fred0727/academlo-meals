const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User delete successfully',
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: ['active', 'completed'],
    },
    include: [
      {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['id', 'name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  if (!order) {
    return next(new AppError(`Order with the id ${id} not found`, 401));
  }

  if (order.userId !== sessionUser.id) {
    return next(
      new AppError(`Order with the id ${id} does not belong to the user`, 401)
    );
  }

  return res.status(200).json({
    status: 'success',
    order,
  });
});
