import { Router } from 'express';

import tasksController from './task.controller';

const router = Router();

router
  .route('/:boardId/tasks')
  .get(tasksController.getAllByBoardId)
  .post(tasksController.create);

router
  .route('/:boardId/tasks/:taskId')
  .get(tasksController.getByBoardIdAndTaskId)
  .put(tasksController.updateByBoardIdAndTaskId)
  .delete(tasksController.deleteByBoardIdAndTaskId);

export default router;
