const { check } = require('express-validator');

module.exports = {
  create: [
    check('title')
      .isLength({ min: 3, max: 50 })
      .withMessage('Title must be between 3 and 50 characters long'),
    check('description')
      .isLength({ min: 3, max: 200 })
      .withMessage('Description must be between 3 and 200 characters long'),
    check('status')
      .isIn(['todo', 'in_progress', 'completed'])
      .withMessage('Status must be todo, in_progress or completed'),
    check('priority')
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium or high'),
  ],
  delete: [check('id').isMongoId().withMessage('Task id must be a valid id')],
  update: [
    check('id').isMongoId().withMessage('Task id must be a valid id'),
    check('title')
      .isLength({ min: 3, max: 50 })
      .withMessage('Title must be between 3 and 50 characters long'),
    check('description')
      .isLength({ min: 3, max: 200 })
      .withMessage('Description must be between 3 and 200 characters long'),
    check('status')
      .isIn(['todo', 'in_progress', 'completed'])
      .withMessage('Status must be todo, in_progress or completed'),
    check('priority')
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium or high'),
  ],
};
