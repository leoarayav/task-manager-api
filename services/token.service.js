const Token = require('../schemas/token');
const config = require('../config');
const jwt_service = require('./jwt.service');
const GeneralError = require('../helpers/errors');

module.exports = {
  /**
   * @description Creates a token
   * @param {Object} payload - The payload to sign
   * @param {String} type - The type of token to create
   * @param {Boolean} save - Whether to save the token to the database (default: false)
   * @returns {Promise<String>}
   * @throws {GeneralError}
   */
  create: async ({ payload, type, save = false }) => {
    try {
      const token = await jwt_service.sign(
        payload,
        config.security.tokens[type].secret,
        config.security.tokens[type].expire,
      );
      const { exp } = await jwt_service.verify(
        token,
        config.security.tokens[type].secret,
      );
      if (save)
        await Token.create({
          userId: payload.id,
          token,
          type,
          expiration: exp,
        });
      return token;
    } catch (err) {
      throw new GeneralError({
        type: 'token_error',
        statusCode: 500,
        msg: err.message,
        err,
      });
    }
  },

  /**
   * @description Verify a token
   * @param {String} token - The token to verify
   * @param {String} type - The type of token to verify
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  verify: async (token, type) => {
    try {
      return await jwt_service.verify(
        token,
        config.security.tokens[type].secret,
      );
    } catch (err) {
      throw new GeneralError({
        type: 'token_error_verify',
        statusCode: 500,
        msg: err.message,
        err,
      });
    }
  },

  /**
   * @description Remove a token
   * @param {String} tokenId - The token to remove
   * @returns {Promise<Boolean>}
   * @throws {GeneralError}
   */
  remove: async tokenId => {
    try {
      const token = await Token.findByIdAndDelete(tokenId);
      return !!token;
    } catch (err) {
      throw new GeneralError({
        type: 'token_error_remove',
        statusCode: 500,
        msg: err.message,
        err,
      });
    }
  },

  /**
   * @description Remove all tokens by user
   * @param {String} userId - The user id
   * @returns {Promise<Boolean>}
   */
  remove_by_user: async userId => await Token.deleteMany({ userId }),
};
