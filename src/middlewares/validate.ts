import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ code: 'VALIDATION_ERROR', errors: errors.array() });
};
