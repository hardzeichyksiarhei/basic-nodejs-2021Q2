import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

import BoardColumn from '../columns/column.model';

@Entity({ name: 'boards' })
class Board {
  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar')
  title: string = 'Board';

  @Column('jsonb')
  columns: BoardColumn[] = [];

  static toResponse(board: Omit<Board, 'id'>) {
    return board;
  }
}

export default Board;
