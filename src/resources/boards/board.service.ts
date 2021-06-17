import { getCustomRepository } from 'typeorm';

import Board from './board.entity';
import Column from '../columns/column.model';

import { BoardRepository } from './board.repository';
import { TaskRepository } from '../tasks/task.repository';

const create = async (payload: Omit<Board, 'id'>): Promise<Board> => {
  const boardRepository = getCustomRepository(BoardRepository);

  const columns = await Promise.all(payload.columns?.map(Column.create) || []);
  const boardCreatable = { ...payload, columns };
  const board = boardRepository.createBoard(boardCreatable);
  await boardRepository.save(board);
  return board;
};

const getAll = async (): Promise<Board[]> => {
  const boardRepository = getCustomRepository(BoardRepository);
  return boardRepository.getAllBoards();
};

const getById = async (id: string): Promise<Board | null> => {
  const boardRepository = getCustomRepository(BoardRepository);

  const board = await boardRepository.getBoardById(id);
  if (!board) return null;
  return board;
};

const updateById = async (
  id: string,
  payload: Partial<Omit<Board, 'id'>>
): Promise<Board | null> => {
  const boardRepository = getCustomRepository(BoardRepository);

  const columns = await Promise.all(payload.columns?.map(Column.create) || []);
  const boardUpdatable = { ...payload, columns };
  await boardRepository.updateBoardById(id, boardUpdatable);

  const board = await boardRepository.getBoardById(id);
  if (!board) return null;
  return board;
};

const deleteById = async (id: string): Promise<Board | null> => {
  const boardRepository = getCustomRepository(BoardRepository);

  const boardDeletable = await boardRepository.getBoardById(id);
  if (!boardDeletable) return null;

  await boardRepository.deleteBoardById(id);

  const taskRepository = getCustomRepository(TaskRepository);
  await taskRepository.update({ boardId: id }, { boardId: null });

  return boardDeletable;
};

export default { create, getAll, getById, updateById, deleteById };
