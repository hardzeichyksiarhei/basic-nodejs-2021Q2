import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import AppError from '../../classes/appError.class';
import User from '../users/user.entity';
import authService from './auth.service';

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user = await authService.findByCredentials(login, password);
  if (!user) {
    throw new AppError(
      'Login failed! Check authentication credentials',
      StatusCodes.FORBIDDEN,
      'FORBIDDEN'
    );
  }
  const token = await user.generateAuthToken();
  return res.status(StatusCodes.OK).json({ token, user: User.toResponse(user) });
});

export default { logIn };
