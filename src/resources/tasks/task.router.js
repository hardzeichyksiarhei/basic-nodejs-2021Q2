const router = require('express').Router();

const tasksController = require('./task.controller');

router.route('/').get(tasksController.getAll).post(tasksController.create);

router
  .route('/:taskId')
  .get(tasksController.getById)
  .put(tasksController.updateById)
  .delete(tasksController.deleteById);

module.exports = router;
