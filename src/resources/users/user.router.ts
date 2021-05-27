import { Router } from 'express';

import UserController from './user.controller';
import UserValidator from './user.validator';

import { validate } from '../../middlewares';

const router = Router();

router
  .route('/')
  .get(UserController.getAll)
  .post(UserValidator.create(), validate, UserController.create);

router
  .route('/:userId')
  .get(UserValidator.getById(), validate, UserController.getById)
  .put(UserValidator.updateById(), validate, UserController.updateById)
  .delete(UserValidator.deleteById(), validate, UserController.deleteById);

export default router;
