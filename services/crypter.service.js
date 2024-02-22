const bcrypt = require('bcrypt');
const config = require('../config');

module.exports = {
  /**
   * @description Hash password
   * @param {string} password
   * @returns {Promise<string>}
   */
  hash: async password =>
    await bcrypt.hash(password, config.security.salt_rounds),

  /**
   * @description Compare password with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  compare: async (password, hash) => await bcrypt.compare(password, hash),
};
