import { Router } from 'express';

export class myRouter {
  private static router: Router;

  static get getMyRouter(): Router {
    if (!this.router) {
      this.router = Router();
    }

    return this.router;
  }
}
