import { ValidationError } from 'express-validator';
import { CustomError } from './CastomError';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  normalizeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
