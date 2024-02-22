const catchsync = require('../helpers/catchsync');
const GeneralError = require('../helpers/errors');

const jwt_service = require('../services/jwt.service');
const users_service = require('../services/users.service');

const config = require('../config');

/**
 * @description Authenticate middleware
 */
module.exports = catchsync(async (req, res, next) => {
  try {
    let bearer = req.headers.authorization || req.cookies.authorization;
    if (!bearer)
      throw new GeneralError({
        type: 'auth_error',
        msg: 'Authorization bearer header is missing or invalid',
        statusCode: 401,
      });
    bearer = bearer.split(' ')[1];
    if (!bearer)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'The token format is invalid',
        statusCode: 401,
      });
    const payload = await jwt_service.verify(
      bearer,
      config.security.tokens.access.secret,
    );
    const user = await users_service.find_by_id(payload.id);
    if (!user)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'The user does not exist',
        statusCode: 401,
      });
    req.user = { ...payload, new_role: user.role };
    next();
  } catch (err) {
    next(err);
  }
});
