const { check } = require('express-validator');

module.exports = {
  create: [
    check('firstname')
      .isLength({ min: 3, max: 20 })
      .withMessage('Firstname must be between 3 and 20 characters long'),
    check('lastname')
      .isLength({ min: 3, max: 20 })
      .withMessage('Lastname must be between 3 and 20 characters long'),
    check('username')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters long'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  update: [
    check('username')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters long'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  delete: [check('id').isMongoId().withMessage('Invalid id provided')],
  login: [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be at least 6 characters long'),
  ],
};
