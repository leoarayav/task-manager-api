const catchsync = require('../helpers/catchsync');
const GeneralError = require('../helpers/errors');
const { validationResult } = require('express-validator');

/**
 * @description Validate a request
 * @returns {Promise<Object>}
 */
module.exports = checks => {
  return catchsync(async (req, _, next) => {
    const results = checks.map(check => check.run(req));
    await Promise.all(results);
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    next(new GeneralError({ msg: errors.array()[0].msg, statusCode: 400 }));
  });
};
