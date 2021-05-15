const router = require('express').Router();

const boardsController = require('./board.controller');

router.route('/').get(boardsController.getAll).post(boardsController.create);

router
  .route('/:boardId')
  .get(boardsController.getById)
  .put(boardsController.updateById)
  .delete(boardsController.deleteById);

module.exports = router;
