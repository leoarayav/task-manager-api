const User = require('../schemas/user');

module.exports = {
  /**
   * @description Create a new user
   * @param {Object} user
   * @returns {Promise<Object>}
   */
  create: async user => await User.create(user),

  /**
   * @description Find all users
   * @param {string} email
   * @returns {Promise<Object>}
   */
  find_all: async (secure = true) =>
    secure ? await User.find().select('-password') : await User.find(),

  /**
   * @description Find user by email
   * @param {string} email
   * @returns {Promise<Object>}
   */
  find_by_email: async user => User.findOne({ email: user.email }),

  /**
   * @description Find user by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  find_by_id: async id => User.findById(id),

  /**
   * @description Update a user
   * @param {string} id
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  update: async (id, payload) =>
    await User.findByIdAndUpdate(id, payload, { new: true }),

  /**
   * @description Delete a user
   * @param {string} id
   * @returns {Promise<Object>}
   */
  delete: async id => await User.findByIdAndDelete(id),

  /**
   * @description Find by
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  find_by: async payload => await User.findOne(payload),
};
