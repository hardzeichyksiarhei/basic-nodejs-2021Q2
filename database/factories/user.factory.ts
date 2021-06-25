import { getCustomRepository } from 'typeorm';
import { define } from 'typeorm-seeding';
import User from '../../src/resources/users/user.entity';
import { UserRepository } from '../../src/resources/users/user.repository';

define(User, () => {
  const user = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  } as Omit<User, 'id'>;

  const userRepository = getCustomRepository(UserRepository);
  return userRepository.createUser(user);
});
