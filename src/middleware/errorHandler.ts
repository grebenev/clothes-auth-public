import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CastomError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.normalizeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Somthing went wrong' }],
  });
};
