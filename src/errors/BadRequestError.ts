import { CustomError } from './CastomError';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get getNormalErrors() {
    return [{ message: this.message }];
  }
}
