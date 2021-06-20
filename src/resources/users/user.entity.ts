import bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { default: '' })
  name: string = '';

  @Column('varchar')
  login!: string;

  @Column('varchar')
  password!: string;

  @BeforeInsert()
  generatePasswordHash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  static toResponse({ id, login, name }: User) {
    return { id, login, name };
  }
}

export default User;
