/**
 * @description Helper to send success responses
 * @returns {Object}
 */
module.exports = ({ res, code = 200, message = 'Success', body, options }) => {
  res.status(code).json({
    code,
    message,
    body,
    options,
  });
};
