import { Request, Response } from 'express';
import { get, post } from '../decorators/routesDecorators';
import { classController } from '../decorators/classDecorators';

@classController('/api/users')
class LoginController {
  @get('/currentuser')
  getCurrentUser(req: Request, res: Response): void {
    res.json('Hi there currentuser!!');
  }

  @post('/signin')
  signinUser(req: Request, res: Response): void {
    res.json('Post request to signinUser is worked !');
  }

  // @post('/api/users/signout')
  signoutUser(req: Request, res: Response): void {}

  // @post('/api/users/signup')
  signupUser(req: Request, res: Response): void {}
}
