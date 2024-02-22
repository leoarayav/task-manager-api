const router = require('express').Router();

// required modules
const task_controller = require('../controllers/tasks.controller');
const task_checks = require('../checks/tasks');

// middlewares
const validation = require('../middlewares/validation');
const authenticate = require('../middlewares/authenticate');
const ownership = require('../middlewares/ownership');
const admin = require('../middlewares/admin');

// setting up the routes
// TODO: complete the routes based on the controller and logic
router.get('/', authenticate, task_controller.find_all);
router.post(
  '/',
  authenticate,
  validation(task_checks.create),
  task_controller.create,
);
router.put('/:taskId/assign-to', authenticate, task_controller.assign);

// exporting the router
module.exports = router;
