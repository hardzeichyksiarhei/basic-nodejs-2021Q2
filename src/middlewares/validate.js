const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ code: 'VALIDATION_ERROR', errors: errors.array() });
};
