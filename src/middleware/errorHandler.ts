import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CastomError';

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

// 5 Auth-4 Error Handler (стр 13)
// Можно ли использовать декораторы для ошибок?
