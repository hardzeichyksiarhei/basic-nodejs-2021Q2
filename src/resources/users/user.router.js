const router = require('express').Router();

const usersController = require('./user.controller');

router.route('/').get(usersController.getAll).post(usersController.create);

router
  .route('/:userId')
  .get(usersController.getById)
  .put(usersController.updateById)
  .delete(usersController.deleteById);

module.exports = router;
