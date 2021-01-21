import { CustomError } from './CastomError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  get getNormalErrors() {
    return [{ message: 'Route not found' }];
  }
}
