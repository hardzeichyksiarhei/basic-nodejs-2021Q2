import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import AppError from '../../classes/appError.class';
import Board from './board.entity';
import boardsService from './board.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const board = await boardsService.create(req.body);
  if (!board) {
    throw new AppError('Board not create', StatusCodes.BAD_REQUEST, 'BOARD_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Board.toResponse(board));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const boards = await boardsService.getAll();
  return res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await boardsService.getById(boardId!);
  if (!board) {
    throw new AppError('Board not found', StatusCodes.NOT_FOUND, 'BOARD_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Board.toResponse(board));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await boardsService.updateById(boardId!, req.body);
  if (!board) {
    throw new AppError('Board not found', StatusCodes.NOT_FOUND, 'BOARD_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(board && Board.toResponse(board));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await boardsService.deleteById(boardId!);
  if (!board) {
    throw new AppError('Board not found', StatusCodes.NOT_FOUND, 'BOARD_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Board.toResponse(board));
});

export default { create, getAll, getById, updateById, deleteById };
