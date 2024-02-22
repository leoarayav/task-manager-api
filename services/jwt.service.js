const { sign, verify, decode } = require('jsonwebtoken');
const GeneralError = require('../helpers/errors');

module.exports = {
  /**
   * @description Signs a jwt
   * @param {Object} payload - The payload to sign
   * @param {String} secret - The secret to sign the jwt with
   * @param {String} expiresIn - The expiration time of the jwt
   * @returns {Promise<String>}
   */
  sign: async (payload, secret, expiresIn) =>
    await sign(payload, secret, { expiresIn }),

  /**
   * @description Verifies a jwt
   * @param {String} token - The jwt to verify
   * @param {String} secret - The secret to verify the jwt with
   * @returns {Promise<Object>}
   */
  verify: async (token, secret) => {
    try {
      return await verify(token, secret);
    } catch (err) {
      throw new GeneralError({
        statusCode: 401,
        msg: 'The token is invalid or has expired',
      });
    }
  },

  /**
   * @description Decodes a jwt
   * @param {String} token - The jwt to decode
   * @returns {Promise<Object>}
   */
  decode: async token => await decode(token),
};
