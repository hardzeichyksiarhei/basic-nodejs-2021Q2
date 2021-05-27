import { Router } from 'express';

import boardsController from './board.controller';

const router = Router();

router.route('/').get(boardsController.getAll).post(boardsController.create);

router
  .route('/:boardId')
  .get(boardsController.getById)
  .put(boardsController.updateById)
  .delete(boardsController.deleteById);

export default router;
