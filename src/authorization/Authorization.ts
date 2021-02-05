import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
  static getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
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
  };

  static checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      return res.status(401).send({ message: 'Not authoize' });
    }

    next();
  };
}
