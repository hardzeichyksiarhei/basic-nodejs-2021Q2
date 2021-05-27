import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Board from './board.model';
import boardsService from './board.service';

import { TBoard } from './board.type';

const create = asyncHandler(async (req: Request, res: Response) => {
  const payload: TBoard = req.body;
  const board = await boardsService.create(payload);
  if (!board) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'BOARD_NOT_CREATE', msg: 'Board not create' });
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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
  }
  return res.status(StatusCodes.OK).json(Board.toResponse(board));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await boardsService.updateById(boardId!, req.body);
  if (!board) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
  }
  return res.status(StatusCodes.OK).json(board && Board.toResponse(board));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await boardsService.deleteById(boardId!);
  if (!board) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
  }
  return res.status(StatusCodes.OK).json(Board.toResponse(board));
});

export default { create, getAll, getById, updateById, deleteById };
