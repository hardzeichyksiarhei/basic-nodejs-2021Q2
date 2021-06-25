import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import { UserRepository } from '../resources/users/user.repository';
import AppError from '../classes/appError.class';
import config from '../common/config';

const { JWT_SECRET_KEY } = config;

export interface TokenInterface {
  userId: string;
  login: string;
}

export const auth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next(); // allowing options as a method for request
  }

  try {
    const userRepository = getCustomRepository(UserRepository);
    let sessionToken = req.headers.authorization;
    if (sessionToken && sessionToken.indexOf('Bearer ') === 0) {
      sessionToken = sessionToken.slice(7, sessionToken.length);
    }

    if (!sessionToken) {
      throw new Error('Not authorized to access this resource. Auth token is not supplied');
    }

    const decoded = jwt.verify(sessionToken, JWT_SECRET_KEY) as TokenInterface;

    if (!decoded || !decoded.userId) {
      throw new Error('Not authorized to access this resource. Token is not valid');
    }

    const user = await userRepository.getUserById(decoded.userId);
    if (!user) throw new Error('Not authorized to access this resource. Token is not valid');
  } catch (error) {
    throw new AppError(error.message, StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
  }

  return next();
});
