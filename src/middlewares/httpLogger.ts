import { Request } from 'express';
import morgan from 'morgan';
import logger from '../common/logger';

morgan.token('query', (req: Request) => JSON.stringify(req.query));
morgan.token('params', (req: Request) => JSON.stringify(req.params));
morgan.token('body', (req: Request) => JSON.stringify(req.body));

const successFormat = ':method :url :status :query :params :body - :response-time ms';
const errorFormat = ':method :url :status - :response-time ms';

const successHttpLogger = morgan(successFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHttpLogger = morgan(errorFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export { successHttpLogger, errorHttpLogger };
