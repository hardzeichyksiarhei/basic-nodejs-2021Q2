import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';

@Entity({ name: 'users' })
class User {
  @PrimaryColumn('varchar')
  id: string = uuid();

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
