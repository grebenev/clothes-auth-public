import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { decorator, classController } from '../decorators';
import { User } from '../models/userModel';
import {
  signinChain,
  signupChain,
  requestValidation,
  comparePasswords,
} from '../validation';
import { BadRequestError } from '../errors';

@classController('/api/users')
class LoginController {
  @decorator.get('/currentuser')
  getCurrentUser(req: Request, res: Response): void {
    res.json('Hi there currentuser!!');
  }

  static setToken(req: Request, user: any) {
    if (process.env.JWT_KEY) {
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY
      );

      // save JsonWebToken in session object
      req.session = {
        jwt: userJwt,
      };
    }
  }

  @decorator.post('/signin')
  @decorator.use(signinChain)
  @decorator.use(requestValidation)
  async signinUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // find user email in mongo
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('email not found');
    }

    // compare passwords
    const passwordMatch = await comparePasswords(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Password incorrect');
    }

    // set JWT for signin user
    LoginController.setToken(req, existingUser);

    res.status(201).send(existingUser);
  }

  // @post('/api/users/signout')
  signoutUser(req: Request, res: Response): void {}

  @decorator.post('/signup')
  @decorator.use(signupChain)
  @decorator.use(requestValidation)
  async signupUser(req: Request, res: Response) {
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

    // set JWT for signup user
    LoginController.setToken(req, user);

    res.status(201).send(user);
  }
}
