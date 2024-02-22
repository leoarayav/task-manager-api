/**
 * @description General error class
 * @extends Error
 */
module.exports = class GeneralError extends Error {
  constructor({ type, msg, statusCode, errors }) {
    super();
    this.type = type;
    this.message = msg;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
};
