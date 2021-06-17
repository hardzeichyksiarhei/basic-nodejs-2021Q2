import { EntityRepository, Repository } from 'typeorm';
import Board from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  createBoard(user: Omit<Board, 'id'>) {
    return this.create(user);
  }

  getAllBoards() {
    return this.find();
  }

  getBoardById(id: string) {
    return this.findOne({ id });
  }

  updateBoardById(id: string, board: Partial<Board>) {
    return this.update({ id }, board);
  }

  deleteBoardById(id: string) {
    return this.delete({ id });
  }
}
