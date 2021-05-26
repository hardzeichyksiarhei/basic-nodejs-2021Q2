/**
 * Catches errors and passes them to the next callback
 * @param {Function} fn Async express request handler/middleware potentially throwing errors
 * @returns {Promise<Function>} Async express request handler with error handling
 */
const catchErrors = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = catchErrors;
