import { Router } from 'express';

export class myRouter {
  private static router: Router;

  static get getRouter(): Router {
    if (!this.router) {
      this.router = Router();
    }

    return this.router;
  }
}
