const catchsync = require('../helpers/catchsync');
const GeneralError = require('../helpers/errors');

/**
 * @description This middleware checks if the user is the owner of the resource
 * @returns {Function} next
 */
module.exports = catchsync(async (req, _, next) => {
  try {
    const user = req.user;
    if (!user)
      throw new GeneralError({
        type: 'unauthorization',
        msg: 'You are not authorized to perform this action',
        statusCode: 401,
      });
    if (
      user.new_role === 1 ||
      user.new_role === 2 ||
      user.id === Number(req.params.id)
    )
      next();
    else
      throw new GeneralError({
        type: 'forbidden',
        msg: 'You dont have permission to perform this action',
        statusCode: 403,
      });
  } catch (err) {
    next(err);
  }
});
