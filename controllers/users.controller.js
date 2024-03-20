const success_response = require('../helpers/success');
const catchsync = require('../helpers/catchsync');
const GeneralError = require('../helpers/errors');

const user_service = require('../services/users.service');
const auth_service = require('../services/auth.service');

module.exports = {
  /**
   * @description Get all users
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  find_all: catchsync(async (req, res, next) => {
    try {
      const users = await user_service.find_all(true);
      if (!users || users.length === 0)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Users not found',
        });
      success_response({
        res,
        message: 'Users fetched successfully',
        body: users,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Create a new user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  create: catchsync(async (req, res, next) => {
    try {
      const user = await user_service.create(req.body);
      if (!user)
        throw new GeneralError({
          type: 'not_created',
          statusCode: 400,
          msg: 'User not created',
        });
      const existent = await user_service.find_by_email(user.email);
      if (existent)
        throw new GeneralError({
          type: 'already_exists',
          statusCode: 400,
          msg: 'User already exists',
        });
      return success_response({
        res,
        statusCode: 201,
        message: 'User created successfully',
        body: user,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Update a user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  update: catchsync(async (req, res, next) => {
    try {
      const user = await user_service.update(req.params.id, req.body);
      if (!user)
        throw new GeneralError({
          type: 'not_updated',
          statusCode: 400,
          msg: 'Cannot update this user',
        });
      return success_response({
        res,
        message: 'User updated successfully',
        body: user,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Delete a user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  delete: catchsync(async (req, res, next) => {
    try {
      const user = await user_service.delete(req.params.id);
      if (!user)
        throw new GeneralError({
          type: 'not_deleted',
          statusCode: 400,
          msg: 'Cannot delete this user',
        });
      return success_response({
        res,
        message: 'User deleted successfully',
        body: user,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Login a user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  login: catchsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await user_service.find_by({ email });
      if (!user)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'User not found',
        });
      const result = await auth_service.login(user, password);
      if (!result)
        throw new GeneralError({
          type: 'not_authorized',
          statusCode: 401,
          msg: 'User not authorized to login',
        });
      return success_response({
        res,
        message: 'User logged in successfully',
        body: result,
      });
    } catch (err) {
      next(err);
    }
  }),

  /**
   * @description Get a user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  me: catchsync(async (req, res, next) => {
    try {
      if (!req.user)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'User not found or not logged in',
        });
      const user = await user_service.find_by_id(req.user.id);
      if (!user)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'User not found',
        });
      success_response({
        res,
        message: 'User fetched successfully',
        body: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          role: user.role === 1 ? 'admin' : 'user',
        },
      });
    } catch (err) {
      next(err);
    }
  }),
};
