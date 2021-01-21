import { Request, Response } from 'express';
import { decorator } from '../decorators/routesDecorators';
import { classController } from '../decorators/classDecorators';
import { body, validationResult } from 'express-validator';
import { User } from '../models/userModel';
import { ValidatorErrors } from '../errors';

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
  async signupUser(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidatorErrors(errors.array());
    }

    const { email, password } = req.body;

    // find user email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in use');
      return res.send({});
    }

    // save user to mongo
    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
}
