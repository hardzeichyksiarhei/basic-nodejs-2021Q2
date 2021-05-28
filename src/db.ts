import { IUser } from './resources/users/user.interface';
import { IBoard } from './resources/boards/board.interface';
import { TTask } from './resources/tasks/task.type';

const users: IUser[] = [];
const boards: IBoard[] = [];
const tasks: TTask[] = [];

export default { users, boards, tasks };
