/**
 * Higher order function for error handling
 * @param {Function} fn Any function that is potentially error-prone
 * @returns {Promise<Function>} Middleware function
 */
const catchErrors = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = catchErrors;
