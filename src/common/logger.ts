import { createLogger, transports, format } from 'winston';

import config from './config';

const { NODE_ENV } = config;

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info['timestamp']} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: './logs/errors.log', level: 'error' }),
    new transports.File({ filename: './logs/all.log', maxsize: 5242880, level: 'info' }),
  ],
});

if (NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

export default logger;
