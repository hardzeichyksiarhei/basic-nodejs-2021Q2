import { Server } from 'http';
import AppError from '../classes/appError.class';
import logger from './logger';

const isOperationalError = (error: Error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

const killProcess = (server: Server) => setTimeout(() => server.close(() => process.exit(1)), 100);

const uncaughtExceptionHandler = (server: Server, isProcessExit: boolean = false) => (
  error: Error
) => {
  logger.error(`uncaughtException: ${error.message}\n${error.stack}`);

  logger.on('finish', () => {
    if (isProcessExit && !isOperationalError(error)) killProcess(server);
  });
  logger.end();
};

const unhandledRejectionHandler = (server: Server, isProcessExit: boolean = false) => async (
  error: Error
) => {
  logger.error(`unhandledRejection: ${error.message}\n${error.stack}`);

  logger.on('finish', () => {
    if (isProcessExit && !isOperationalError(error)) killProcess(server);
  });
  logger.end();
};

export { uncaughtExceptionHandler, unhandledRejectionHandler };
