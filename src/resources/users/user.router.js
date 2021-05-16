const router = require('express').Router();

const usersController = require('./user.controller');
const usersValidator = require('./user.validator');

const { validate } = require('../../middlewares');

router
  .route('/')
  .get(usersController.getAll)
  .post([usersValidator.create(), validate, usersController.create]);

router
  .route('/:userId')
  .get([usersValidator.getById(), validate, usersController.getById])
  .put([usersValidator.updateById(), validate, usersController.updateById])
  .delete([usersValidator.deleteById(), validate, usersController.deleteById]);

module.exports = router;
