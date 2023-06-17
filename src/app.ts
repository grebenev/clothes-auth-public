import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import './controllers/LoginController';
import { NotFoundError, errorHandler, myRouter } from '@grebenev.com/common2';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
  })
);
app.use(myRouter.getMyRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
