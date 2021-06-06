import { Server } from 'http';
import AppError from '../classes/appError.class';
import logger from './logger';

const isOperationalError = (error: Error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

const uncaughtExceptionHandler = (server: Server) => (error: Error) => {
  logger.error(`uncaughtException: ${error.message}\n${error.stack}`, () => {
    if (!isOperationalError(error)) server.close(() => process.exit(1));
  });
};

const unhandledRejectionHandler = (server: Server) => async (error: Error) => {
  logger.error(`unhandledRejection: ${error.message}\n${error.stack}`, () => {
    if (!isOperationalError(error)) server.close(() => process.exit(1));
  });
};

export { uncaughtExceptionHandler, unhandledRejectionHandler };
