const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
  /**
   * @description Connect to the database
   * @returns {Promise<void>}
   */
  connect: async () => {
    try {
      if (config.global.env === 'development') mongoose.set('debug', true);
      await mongoose.connect(config.database.url);
      return console.info(`Connected to ${config.database.url} database`);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * @description Disconnect from the database
   * @returns {Promise<void>}
   */
  disconnect: async () => {
    try {
      await mongoose.disconnect();
      return console.info(`Disconnected from ${config.database.url} database`);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
