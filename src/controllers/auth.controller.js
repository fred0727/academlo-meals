const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

exports.SignUp = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
  });

  if (!user) {
    return next(new AppError('An error has occurred, user not created', 400));
  }

  return res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.SignIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }

  // Validamos si la contraseña es correcta
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Incorret email or password`, 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'Success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
