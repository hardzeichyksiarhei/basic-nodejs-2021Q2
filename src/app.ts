import express, { Request, Response, NextFunction } from 'express';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import authRouter from './resources/auth/auth.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

import { notFound, auth, successHttpLogger, errorHttpLogger, errorLogger } from './middlewares';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(successHttpLogger);
app.use(errorHttpLogger);

app.use('/', authRouter);
app.use('/users', auth, userRouter);
app.use('/boards', auth, boardRouter);
app.use('/boards', auth, taskRouter);

app.use(notFound);
app.use(errorLogger);

export default app;
