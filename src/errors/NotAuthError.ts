import { CustomError } from './CastomError';

export class NotAuthError extends CustomError {
  statusCode = 401;
  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthError.prototype);
  }
  get getNormalErrors() {
    return [{ message: 'Authorization error' }];
  }
}
