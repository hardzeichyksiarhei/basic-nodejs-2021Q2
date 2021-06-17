import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

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

  static toResponse({ id, login, name }: User) {
    return { id, login, name };
  }
}

export default User;
