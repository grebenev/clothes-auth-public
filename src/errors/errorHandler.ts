import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CastomError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.getNormalErrors });
  }

  res.status(400).send({
    errors: [{ message: 'Somthing went wrong' }],
  });
};
