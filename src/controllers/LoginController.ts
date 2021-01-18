import { Request, Response } from 'express';
import { get } from '../decorators/routesDecorators';
import { classController } from '../decorators/classDecorators';

@classController('')
class LoginController {
  @get<LoginController>('/api/users/currentuser')
  getCurrentUser(req: Request, res: Response): void {
    res.json('Hi there form Konstantin2!');
  }

  // @post('/api/users/signin')
  signinUser(req: Request, res: Response): void {}

  // @post('/api/users/signout')
  signoutUser(req: Request, res: Response): void {}

  // @post('/api/users/signup')
  signupUser(req: Request, res: Response): void {}
}
