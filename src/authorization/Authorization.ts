import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { NotAuthError } from '../errors/NotAuthError';

interface CurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

export class Authorization {
  static check = {
    currentUser(req: Request, res: Response, next: NextFunction) {
      if (!req.session?.jwt) {
        next();
      } else {
        try {
          const currentUser = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
          ) as CurrentUser;
          req.currentUser = currentUser;
        } catch (err) {}

        next();
      }
    },
    auth(req: Request, res: Response, next: NextFunction) {
      if (!req.currentUser) {
        throw new NotAuthError();
      }

      next();
    },
  };
}
