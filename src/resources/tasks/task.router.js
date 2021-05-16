const router = require('express').Router();

const tasksController = require('./task.controller');

router
  .route('/:boardId/tasks')
  .get(tasksController.getAllByBoardId)
  .post(tasksController.create);

router
  .route('/:boardId/tasks/:taskId')
  .get(tasksController.getByBoardIdAndTaskId)
  .put(tasksController.updateByBoardIdAndTaskId)
  .delete(tasksController.deleteByBoardIdAndTaskId);

module.exports = router;
