const tasks = require('../../data/tasks');

const add = async (task) => {
  tasks.push(task);
  return task;
};

const insert = async (task) => add(task);

const getAll = async () => tasks;

const getAllByBoardId = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

const getByBoardIdAndTaskId = async (boardId, taskId) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

const deleteByBoardIdAndTaskId = async (boardId, taskId) => {
  const idx = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (idx === -1) return null;
  const taskDeletable = tasks[idx];
  tasks.splice(idx, 1);
  return taskDeletable;
};

module.exports = {
  add,
  insert,
  getAll,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
