const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email. is required')
    .isEmail()
    .withMessage('Email must be a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a lost 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have contain a one letter'),
  validFields,
];

exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email. is required')
    .isEmail()
    .withMessage('Email must be a correct format'),
  validFields,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('rating')
    .notEmpty()
    .withMessage('Address is required')
    .isInt()
    .withMessage('Price is Integer')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Enter a number between 1 to 5'),
  validFields,
];

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  validFields,
];

exports.creatMealValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isInt()
    .withMessage('Price is Integer'),
  validFields,
];

exports.updateMealValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isInt()
    .withMessage('Price is Integer'),
  validFields,
];

exports.createOrderValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt()
    .withMessage('Quantity is Integer'),
  body('mealId').notEmpty().withMessage('mealId is Required'),
  validFields,
];

exports.createReviewValidation = [
  body('comment').notEmpty().withMessage('Comment is required'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is Required')
    .isInt()
    .withMessage('Rating is Integer')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Enter a number between 1 to 5'),
  validFields,
];

exports.updateReviewValidation = [
  body('comment').notEmpty().withMessage('Comment is required'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is Required')
    .isInt()
    .withMessage('Rating is Integer')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Enter a number between 1 to 5'),
  validFields,
];
