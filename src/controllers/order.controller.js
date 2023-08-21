const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { quantity, mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError('Order not created, meal not found', 400));
  }

  const totalPrice = meal.price * quantity;

  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  return res.status(200).json({
    status: 'sucess',
    message: 'Order createed successfully',
    order,
  });
});

exports.myOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
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

  if (!orders) {
    return next(new AppError('The user does not have orders', 400));
  }

  return res.status(200).json({
    status: 'success',
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res) => {
  const { order } = req;

  await order.update({
    status: 'completed',
  });

  return res.status(200).json({
    status: 'success',
    message: 'Updated order successfully',
  });
});

exports.deleteOrder = catchAsync(async (req, res) => {
  const { order } = req;

  await order.update({
    status: 'cancelled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'Deleted order successfully',
  });
});
