const Address = require('../schemas/address');

module.exports = {
  /**
   * @description Find all addresses
   * @returns {Promise<Object>}
   */
  find_all: async () => await Address.find().populate('user'),

  /**
   * @description Create a new address
   * @param {Object} address
   * @returns {Promise<Object>}
   */
  create: async address => await Address.create(address),

  /**
   * @description Find one address
   * @param {string} id
   * @returns {Promise<Object>}
   */
  find_one: async id => await Address.findById(id).populate('user'),

  /**
   * @description Update an address
   * @param {string} id
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  update: async (id, payload) =>
    await Address.findByIdAndUpdate(id, payload, { new: true }),

  /**
   * @description Delete an address
   * @param {string} id
   * @returns {Promise<Object>}
   */
  delete: async id => await Address.findByIdAndDelete(id),
};
