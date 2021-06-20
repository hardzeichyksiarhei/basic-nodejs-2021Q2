import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import BoardColumn from '../columns/column.model';

@Entity({ name: 'boards' })
class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title: string = 'Board';

  @Column('jsonb')
  columns: BoardColumn[] = [];

  static toResponse(board: Omit<Board, 'id'>) {
    return board;
  }
}

export default Board;
