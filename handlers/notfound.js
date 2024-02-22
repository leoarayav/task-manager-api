/**
 * @description Not found handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
module.exports = (_, res, next) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'API endpoint was not found',
  });
};
