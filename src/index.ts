import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import './controllers/LoginController';
import { myRouter } from './myRouter';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './errors';

const app = express();
app.use(json());
app.use(myRouter.getMyRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!!');
});
