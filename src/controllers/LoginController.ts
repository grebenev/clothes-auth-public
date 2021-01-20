import { Request, Response } from 'express';
import { decorator } from '../decorators/routesDecorators';
import { classController } from '../decorators/classDecorators';
import { body, validationResult } from 'express-validator';

@classController('/api/users')
class LoginController {
  @decorator.get('/currentuser')
  getCurrentUser(req: Request, res: Response): void {
    res.json('Hi there currentuser!!');
  }

  @decorator.post('/signin')
  signinUser(req: Request, res: Response): void {
    res.json('Post request to signinUser is worked !');
  }

  // @post('/api/users/signout')
  signoutUser(req: Request, res: Response): void {}

  @decorator.post('/signup')
  @decorator.use([
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4-20 chr'),
  ])
  signupUser(req: Request, res: Response): void {
    const errors = validationResult(req);

    if (errors) {
      res.status(400).send(errors.array());
      return;
    }

    const { email, password } = req.body;
    res.send({});
  }
}
