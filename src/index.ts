import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { connect } from 'mongoose';
import cookieSession from 'cookie-session';

import './controllers/LoginController';
import { myRouter } from './myRouter';
import { NotFoundError, errorHandler } from './errors';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);
app.use(myRouter.getMyRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

// start
async function start() {
  try {
    await connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to Mongo Db');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
}

start();
