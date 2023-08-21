const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/order.model');

exports.validateOrder = catchAsync(async (req, res, next) => {
  /* valor a retornar */
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    next(new AppError('Order not found', 404));
  }

  req.order = order;
  next();
});
