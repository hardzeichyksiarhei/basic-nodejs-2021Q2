const users = require('../../data/users');

const add = async (user) => {
  users.push(user);
  return user;
};
const insert = async (user) => add(user);

const getAll = async () => users;

const getById = async (id) => users.find((user) => user.id === id);

const updateById = async (id, payload) => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return -1;
  const userUpdatable = users[idx];
  userUpdatable.update(payload);
  return userUpdatable;
};

const deleteById = async (id) => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return -1;
  const userDeletable = users[idx];
  users.splice(idx, 1);
  return userDeletable;
};

module.exports = { add, insert, getAll, getById, updateById, deleteById };
