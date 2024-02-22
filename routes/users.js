const router = require('express').Router();

// required modules
const users_controller = require('../controllers/users.controller');
const users_checks = require('../checks/users');

// middlewares
const validation = require('../middlewares/validation');
const authenticate = require('../middlewares/authenticate');
const ownership = require('../middlewares/ownership');
const admin = require('../middlewares/admin');

// setting up the routes
router.get('/', authenticate, users_controller.find_all);
router.get('/me', authenticate, users_controller.me);
router.post(
  '/register',
  validation(users_checks.create),
  users_controller.create,
);
router.post('/login', validation(users_checks.login), users_controller.login);
router.put(
  '/:id',
  authenticate,
  ownership,
  validation(users_checks.update),
  users_controller.update,
);
router.delete(
  '/:id',
  authenticate,
  admin,
  validation(users_checks.delete),
  users_controller.delete,
);

// exporting the router
module.exports = router;
