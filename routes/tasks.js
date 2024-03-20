const router = require('express').Router();

// required modules
const task_controller = require('../controllers/tasks.controller');
const task_checks = require('../checks/tasks');

// middlewares
const validation = require('../middlewares/validation');
const authenticate = require('../middlewares/authenticate');
const ownership = require('../middlewares/ownership');

// setting up the routes
router.get('/', authenticate, task_controller.find_all);
router.get('/created', authenticate, task_controller.find_by_author);
router.post(
  '/',
  authenticate,
  validation(task_checks.create),
  task_controller.create,
);
router.put('/:taskId/assign-to', authenticate, task_controller.assign);
router.patch(
  '/:taskId',
  authenticate,
  ownership,
  validation(task_checks.update),
  task_controller.update,
);
router.delete('/:taskId', authenticate, ownership, task_controller.delete);

// exporting the router
module.exports = router;
