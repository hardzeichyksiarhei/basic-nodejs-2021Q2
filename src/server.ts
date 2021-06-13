import app from './app';

import { uncaughtExceptionHandler, unhandledRejectionHandler } from './common/errorHandlers';
import config from './common/config';

const { PORT } = config;

const server = app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));

process.on('uncaughtException', uncaughtExceptionHandler(server, true));
process.on('unhandledRejection', unhandledRejectionHandler(server, false));

// For testing errors
// Promise.reject(Error('Promise Oops!'));
// throw Error('Error Oops!');
