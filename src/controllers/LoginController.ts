import { Request, Response } from 'express';
import { get } from '../decorators/routesDecorators';
import { classController } from '../decorators/classDecorators';

@classController('/api/users')
class LoginController {
  @get<LoginController>('/currentuser')
  getCurrentUser(req: Request, res: Response): void {
    res.json('Hi there currentuser!');
  }

  // @post('/api/users/signin')
  signinUser(req: Request, res: Response): void {}

  // @post('/api/users/signout')
  signoutUser(req: Request, res: Response): void {}

  // @post('/api/users/signup')
  signupUser(req: Request, res: Response): void {}
}
