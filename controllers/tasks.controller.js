const success_response = require('../helpers/success');
const catchsync = require('../helpers/catchsync');
const GeneralError = require('../helpers/errors');

const task_service = require('../services/tasks.service');
const user_service = require('../services/users.service');

module.exports = {
  /**
   * @description Get all tasks
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  find_all: catchsync(async (req, res, next) => {
    try {
      const tasks = await task_service.find_all(true);
      if (!tasks || tasks.length === 0)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Tasks not found',
        });
      success_response({
        res,
        message: 'Tasks fetched successfully',
        body: tasks,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Create a new task
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  create: catchsync(async (req, res, next) => {
    try {
      const task = await task_service.create(req.body, req.user.id);
      if (!task)
        throw new GeneralError({
          type: 'not_created',
          statusCode: 400,
          msg: 'Task not created',
        });
      return success_response({
        res,
        message: 'Task created successfully',
        body: task,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Update a task
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  update: catchsync(async (req, res, next) => {
    try {
      const task = await task_service.update(req.params.id, req.body);
      if (!task)
        throw new GeneralError({
          type: 'not_updated',
          statusCode: 400,
          msg: 'Task not updated',
        });
      return success_response({
        res,
        message: 'Task updated successfully',
        body: task,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Delete a task
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  delete: catchsync(async (req, res, next) => {
    try {
      const task = await task_service.delete(req.params.id);
      if (!task)
        throw new GeneralError({
          type: 'not_deleted',
          statusCode: 400,
          msg: 'Task not deleted',
        });
      return success_response({
        res,
        message: 'Task deleted successfully',
        body: task,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Get all tasks by status
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  find_by_status: catchsync(async (req, res, next) => {
    try {
      const tasks = await task_service.find_by_status(req.params.status);
      if (!tasks || tasks.length === 0)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Tasks not found',
        });
      success_response({
        res,
        message: 'Tasks fetched successfully',
        body: tasks,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Assign a task to a user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  assign: catchsync(async (req, res, next) => {
    try {
      const user = req.user;
      const { taskId } = req.params;
      const { userId } = req.body;
      const task = task_service.find_by_id(taskId);
      if (!task)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Task was not found',
        });
      if (!task.author == user.id)
        throw new GeneralError({
          type: 'unauthorized',
          statusCode: 401,
          msg: 'You are not authorized to assign this task',
        });
      const user_existent = user_service.find_by_id(userId);
      if (!user_existent)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'User was not found',
        });
      const assigned_task = await task_service.assign(taskId, userId);
      if (!assigned_task)
        throw new GeneralError({
          type: 'not_assigned',
          statusCode: 400,
          msg: 'Task not assigned',
        });
      return success_response({
        res,
        message: 'Task assigned successfully',
        body: assigned_task,
      });
    } catch (err) {
      next(err);
    }
  }),
  find_by_author: catchsync(async (req, res, next) => {
    try {
      const tasks = await task_service.find_by_author(req.user.id);
      if (!tasks || tasks.length === 0)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Tasks not found',
        });
      success_response({
        res,
        message: 'Your tasks fetched successfully',
        body: tasks,
      });
    } catch (err) {
      next(err);
    }
  }),
};
