const GeneralError = require('../helpers/errors');
const mongoose = require('mongoose');

/**
 * @description Error handler RFC 7807
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
module.exports = (err, _, res, __) => {
  if (err instanceof GeneralError) {
    return res.status(err.statusCode).json({
      type: err.type,
      status: 'Error',
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }
  if (err instanceof mongoose.Error) {
    return res.status(500).json({
      status: 'An error was ocurred internal within the database',
      statusCode: 500,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'Internal Server Error',
    statusCode: 500,
    message: err.message,
  });
};
