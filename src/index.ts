import express from 'express';
import { json } from 'body-parser';
import './controllers/LoginController';
import { myRouter } from './myRouter';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(json());
app.use(myRouter.getMyRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!!');
});
