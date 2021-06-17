import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(user: Omit<User, 'id'>) {
    return this.create(user);
  }

  getAllUsers() {
    return this.find();
  }

  getUserById(id: string) {
    return this.findOne({ id });
  }

  updateUserById(id: string, user: Partial<User>) {
    return this.update({ id }, user);
  }

  deleteUserById(id: string) {
    return this.delete({ id });
  }
}
