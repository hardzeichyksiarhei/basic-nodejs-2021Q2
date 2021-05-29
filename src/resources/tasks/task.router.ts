import { Router } from 'express';

import TaskController from './task.controller';
import TaskValidator from './task.validator';

import { validate } from '../../middlewares';

const router = Router();

router
  .route('/:boardId/tasks')
  .get(TaskValidator.getAllByBoardId(), validate, TaskController.getAllByBoardId)
  .post(TaskValidator.create(), validate, TaskController.create);

router
  .route('/:boardId/tasks/:taskId')
  .get(TaskValidator.deleteByBoardIdAndTaskId(), validate, TaskController.getByBoardIdAndTaskId)
  .put(TaskValidator.updateByBoardIdAndTaskId(), validate, TaskController.updateByBoardIdAndTaskId)
  .delete(
    TaskValidator.deleteByBoardIdAndTaskId(),
    validate,
    TaskController.deleteByBoardIdAndTaskId
  );

export default router;
