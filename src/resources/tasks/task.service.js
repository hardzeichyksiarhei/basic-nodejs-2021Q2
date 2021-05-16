const Task = require('./task.model');

const create = async (payload, params) => {
  const taskCreatable = {
    ...payload,
    boardId: params?.boardId,
  };
  return Task.create(taskCreatable);
};

const getAllByBoardId = ({ boardId }) => Task.getAllByBoardId(boardId);

const getByBoardIdAndTaskId = ({ boardId, taskId }) =>
  Task.getByBoardIdAndTaskId(boardId, taskId);

const updateByBoardIdAndTaskId = async ({ boardId, taskId }, payload) =>
  Task.updateByBoardIdAndTaskId({ boardId, taskId }, payload);

const deleteByBoardIdAndTaskId = async ({ boardId, taskId }) =>
  Task.deleteByBoardIdAndTaskId(boardId, taskId);

module.exports = {
  create,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  updateByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
