import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from './user.model';

import usersService from './user.service';
import { TUser } from './user.type';

const create = asyncHandler(async (req: Request, res: Response) => {
  const user = await usersService.create(req.body);
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const payload: TUser = req.body;
  const user = await usersService.updateById(userId!, payload);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(user && User.toResponse(user));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await usersService.deleteById(userId!);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

export default { create, getAll, getById, updateById, deleteById };
