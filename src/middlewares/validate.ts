import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import ValidateError from '../classes/validationError.class';

export default (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const error = errors.array().pop();

  return next(new ValidateError(error?.msg));
};
