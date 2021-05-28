import { IUser } from './resources/users/user.interface';
import { IBoard } from './resources/boards/board.interface';
import { ITask } from './resources/tasks/task.type';

const users: IUser[] = [];
const boards: IBoard[] = [];
const tasks: ITask[] = [];

export default { users, boards, tasks };
