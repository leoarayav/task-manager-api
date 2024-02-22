const catchsync = require('../helpers/catchsync');

/**
 * @description Middleware to check if the user is an admin
 * @returns {Function} next
 */
module.exports = catchsync(async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'The user does not exist',
        statusCode: 401,
      });
    if (user.role === 0)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'The user is not an admin and you are not allowed to do this',
        statusCode: 401,
      });
    if (user.new_role === 0)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'Account looses admin privileges',
        statusCode: 401,
      });
    next();
  } catch (err) {
    next(err);
  }
});
