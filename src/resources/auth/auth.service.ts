import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../users/user.repository';

import User from '../users/user.entity';

const findByCredentials = async (login: string, password: string): Promise<User | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne({ login });

  if (!user) return null;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return null;
  return user;
};

export default { findByCredentials };
