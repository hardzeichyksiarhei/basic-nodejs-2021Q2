import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import AppError from '../../classes/appError.class';
import User from './user.entity';

import usersService from './user.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const user = await usersService.create(req.body);

  if (!user) {
    throw new AppError('User not create', StatusCodes.BAD_REQUEST, 'USER_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const users = await usersService.getAll();
  return res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await usersService.getById(userId!);

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND, 'USER_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await usersService.updateById(userId!, req.body);
  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND, 'USER_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await usersService.deleteById(userId!);
  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND, 'USER_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

export default { create, getAll, getById, updateById, deleteById };
