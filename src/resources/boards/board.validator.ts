import { param } from 'express-validator';

const boardParam = param('boardId')
  .isUUID(4)
  .withMessage(`Param :boardId must be valid uuid format`);

export default {
  getById: () => [boardParam],
  updateById: () => [boardParam],
  deleteById: () => [boardParam],
};
