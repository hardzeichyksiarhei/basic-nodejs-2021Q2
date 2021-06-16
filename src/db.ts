import { getConnection, createConnection } from 'typeorm';
import { IUser } from './resources/users/user.interface';
import { IBoard } from './resources/boards/board.interface';
import { ITask } from './resources/tasks/task.type';

import { config } from './common/ormconfig';

export const connectDB = async () => {
  let connection = null;

  try {
    connection = getConnection();
  } catch (error) {
    // handle error
  }

  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(config);
    }

    console.log('Succesfully DB connected');
  } catch (error) {
    console.log('Unable to connect to DB', error);
    process.exit(1);
  }
};

const users: IUser[] = [];
const boards: IBoard[] = [];
const tasks: ITask[] = [];

export default { users, boards, tasks, connectDB };
