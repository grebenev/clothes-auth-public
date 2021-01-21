import { ValidationError } from 'express-validator';
import { CustomError } from './CastomError';

export class ValidatorErrors extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, ValidatorErrors.prototype);
  }

  get getNormalErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
