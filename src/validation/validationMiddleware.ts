import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { ValidatorErrors } from '../errors';

export const requestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidatorErrors(errors.array());
  }

  next();
};
