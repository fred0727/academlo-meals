const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const orderController = require('../controllers/order.controller');
const orderMiddleware = require('../middlewares/order.middleware');
const router = express.Router();

router.use(authMiddleware.protect);

router.post(
  '/',
  validationMiddleware.createOrderValidation,
  orderController.createOrder
);

router.get('/me', orderController.myOrders);

router
  .use('/:id', orderMiddleware.validateOrder)
  .route('/:id')
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
