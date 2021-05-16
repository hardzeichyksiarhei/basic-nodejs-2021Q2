const { StatusCodes } = require('http-status-codes');
const Board = require('./board.model');

const catchErrors = require('../../common/catchErrors');
const boardsService = require('./board.service');

exports.create = catchErrors(async (req, res) => {
  const board = await boardsService.create(req.body);
  if (!board) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'BOARD_NOT_CREATE', msg: 'Board not create' });
  }
  return res.status(StatusCodes.CREATED).json(Board.toResponse(board));
});

exports.getAll = catchErrors(async (req, res) => {
  const boards = await boardsService.getAll();
  return res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
});

exports.getById = catchErrors(async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  if (!board) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
  }
  return res.status(StatusCodes.OK).json(Board.toResponse(board));
});

exports.updateById = catchErrors(async (req, res) => {
  const board = await boardsService.updateById(req.params.boardId, req.body);
  if (!board) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
  }
  return res.status(StatusCodes.OK).json(board && Board.toResponse(board));
});

exports.deleteById = catchErrors(async (req, res) => {
  const board = await boardsService.deleteById(req.params.boardId);
  if (!board) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
  }
  return res.status(StatusCodes.OK).json(Board.toResponse(board));
});
