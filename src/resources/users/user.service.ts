import { getCustomRepository } from 'typeorm';
import User from './user.entity';

import { TaskRepository } from '../tasks/task.repository';
import { UserRepository } from './user.repository';

const create = async (payload: Omit<User, 'id'>): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = userRepository.createUser(payload);
  return userRepository.save(user);
};

const getAll = async (): Promise<User[]> => {
  const userRepository = getCustomRepository(UserRepository);
  return userRepository.getAllUsers();
};

const getById = async (id: string): Promise<User | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserById(id);
  if (!user) return null;
  return user;
};

const updateById = async (id: string, payload: Partial<User>): Promise<User | null> => {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.updateUserById(id, payload);
  const user = await userRepository.getUserById(id);
  if (!user) return null;
  return user;
};

const deleteById = async (id: string): Promise<User | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const userDeletable = await userRepository.getUserById(id);
  if (!userDeletable) return null;

  await userRepository.deleteUserById(id);

  const taskRepository = getCustomRepository(TaskRepository);
  await taskRepository.update({ userId: id }, { userId: null });

  return userDeletable;
};

export default { create, getAll, getById, updateById, deleteById };
