import { body, param } from 'express-validator';

const MIN_PASSWORD = 6;

export default {
  create: () => [
    body('password')
      .isLength({ min: MIN_PASSWORD })
      .withMessage(`The password must be at least ${MIN_PASSWORD} characters`),
  ],
  getById: () => [
    param('userId')
      .isUUID(4)
      .withMessage(`Param :userId must be valid uuid format`),
  ],
  updateById: () => [
    param('userId')
      .isUUID(4)
      .withMessage(`Param :userId must be valid uuid format`),
  ],
  deleteById: () => [
    param('userId')
      .isUUID(4)
      .withMessage(`Param :userId must be valid uuid format`),
  ],
};
