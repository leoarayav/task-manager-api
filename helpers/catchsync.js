/**
 * @description Catch async errors
 * @param {Function} handler
 * @returns {Function}
 */
module.exports = handler => (req, res, next) =>
  handler(req, res, next).catch(next);
