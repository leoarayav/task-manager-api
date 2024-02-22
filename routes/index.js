const router = require('express').Router();
const config = require('../config');

// setting up the routes
router.get('/', (_, res) =>
  res.send(`Welcome to ${config.global.app_name} API`),
);
router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

// exporting the router
module.exports = router;
