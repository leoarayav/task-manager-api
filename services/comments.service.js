const Comment = require('../schemas/comment');

module.exports = {
  /**
   * @description Create a new comment for a task
   * @param {Object} comment
   * @returns {Promise<Object>}
   */
  create: async comment => await Comment.create(comment),

  /**
   * @description Find all comments for a task
   * @param {string} task_id
   * @returns {Promise<Object>}
   */
  find_all: async task_id => await Comment.find({ task: task_id }),

  /**
   * @description Find comment by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  find_by_id: async id => await Comment.findById(id),

  /**
   * @description Update a comment
   * @param {string} id
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  update: async (id, payload) =>
    await Comment.findByIdAndUpdate(id, payload, { new: true }),

  /**
   * @description Delete a comment
   * @param {string} id
   * @returns {Promise<Object>}
   */
  delete: async id => await Comment.findByIdAndDelete(id),
};
