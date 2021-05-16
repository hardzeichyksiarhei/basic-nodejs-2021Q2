const tasks = require('../../data/tasks');

const add = async (task) => {
  tasks.push(task);
  return task;
};

const insert = async (task) => add(task);

const getAll = async () => tasks;

const getById = async (id) => tasks.find((task) => task.id === id);

const deleteById = async (id) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return null;
  const taskDeletable = tasks[idx];
  tasks.splice(idx, 1);
  return taskDeletable;
};

module.exports = { add, insert, getAll, getById, deleteById };
