import { Router } from 'express';

import BoardController from './board.controller';
import TaskValidator from './board.validator';

import { validate } from '../../middlewares';

const router = Router();

router.route('/').get(BoardController.getAll).post(BoardController.create);

router
  .route('/:boardId')
  .get(TaskValidator.getById(), validate, BoardController.getById)
  .put(TaskValidator.updateById(), validate, BoardController.updateById)
  .delete(TaskValidator.deleteById(), validate, BoardController.deleteById);

export default router;
