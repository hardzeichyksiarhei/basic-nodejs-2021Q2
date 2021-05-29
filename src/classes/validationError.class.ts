import { StatusCodes } from 'http-status-codes';

import AppError from './appError.class';

class ValidateError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST, 'VALIDATION_ERROR');
  }
}

export default ValidateError;
