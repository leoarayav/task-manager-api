const Task = require('../schemas/task');

module.exports = {
  /**
   * @description Create a new task
   * @param {Object} task
   * @returns {Promise<Object>}
   */
  create: async task => (await Task.create(task)).populate('author'),

  /**
   * @description Find all tasks
   * @returns {Promise<Object>}
   */
  find_all: async () => await Task.find().populate('author assignedTo'),

  /**
   * @description Find task by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  find_by_id: async id => await Task.findById(id),

  /**
   * @description Update a task
   * @param {string} id
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  update: async (id, payload) =>
    await Task.findByIdAndUpdate(id, payload, { new: true }),

  /**
   * @description Delete a task
   * @param {string} id
   * @returns {Promise<Object>}
   */
  delete: async id => await Task.findByIdAndDelete(id),

  /**
   * @description Find by status (todo, in-progress, done)
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  find_by_status: async status =>
    await Task.find({
      status: status,
    }),

  /**
   * @description Find by priority (low, medium, high)
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  find_by_priority: async priority =>
    await Task.find({
      priority: priority,
    }),

  /**
   * @description Find by author
   * @param {Object} authorId
   * @returns {Promise<Object>}
   */
  find_by_author: async authorId =>
    await Task.find({
      author: authorId,
    }).select('-author'),

  /**
   * @description Assign a task to a user
   * @param {string} taskId
   * @param {string} userId
   * @returns {Promise<Object>}
   */
  assign: async (taskId, userId) =>
    await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: userId,
      },
      { new: true },
    ).populate('assignedTo'),
};
