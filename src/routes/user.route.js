const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.SignUp
);

router.post('/signin', authController.SignIn);

router.use(authMiddleware.protect);

router.get('/orders', orderController.myOrders);
router.get('/orders/:id', userController.getOrder);

router
  .use('/:id', userMiddleware.validateUser)
  .route('/:id')
  .patch(
    authMiddleware.protectAccountOwner,
    validationMiddleware.updateUserValidation,
    userController.updateUser
  )
  .delete(authMiddleware.protectAccountOwner, userController.deleteUser);

module.exports = router;
