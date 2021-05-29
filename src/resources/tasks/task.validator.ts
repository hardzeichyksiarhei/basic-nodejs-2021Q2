import { body, param } from 'express-validator';

const boardParamMessage = 'Param :boardId must be valid uuid format';
const taskParamMessage = 'Param :taskId must be valid uuid format';

const boardParam = param('boardId').isUUID(4).withMessage(boardParamMessage);
const taskParam = param('taskId').isUUID(4).withMessage(taskParamMessage);

const orderRule = body('order')
  .if(body('order').exists())
  .isNumeric()
  .withMessage('The must be a number');

export default {
  create: () => [boardParam, orderRule],
  getAllByBoardId: () => [boardParam],
  getByBoardIdAndTaskId: () => [boardParam, taskParam],
  updateByBoardIdAndTaskId: () => [boardParam, taskParam, orderRule],
  deleteByBoardIdAndTaskId: () => [boardParam, taskParam],
};
