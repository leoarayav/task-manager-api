const token_service = require('./token.service');
const crypter_service = require('./crypter.service');
const GeneralError = require('../helpers/errors');

module.exports = {
  /**
   * @description Login a user
   * @param {Object} user - The user to login
   * @param {String} password - The password of the user
   * @returns {Promise<Object}
   * @throws {GeneralError}
   */
  login: async (user, password) => {
    try {
      const valid = await crypter_service.compare(password, user.password);
      if (!valid)
        throw new GeneralError({
          type: 'invalid_credentials',
          message: 'Password is incorrect',
          statusCode: 401,
        });
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        verified: user.verified,
      };
      return {
        payload: {
          ...payload,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        access_token: await token_service.create({
          payload,
          type: 'access',
        }),
        refresh_token: await token_service.create({
          payload,
          type: 'refresh',
        }),
      };
    } catch (err) {
      throw err;
    }
  },
};
