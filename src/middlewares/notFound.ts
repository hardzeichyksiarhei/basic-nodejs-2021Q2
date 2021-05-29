import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../classes/appError.class';

export default (_req: Request, _res: Response, next: NextFunction) =>
  next(new AppError('Not found', StatusCodes.NOT_FOUND, 'NOT_FOUND'));
