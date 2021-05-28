import { IUser } from './resources/users/user.interface';
import { TBoard } from './resources/boards/board.type';
import { TTask } from './resources/tasks/task.type';

const users: IUser[] = [];
const boards: TBoard[] = [];
const tasks: TTask[] = [];

export default { users, boards, tasks };
