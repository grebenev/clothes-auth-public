import express from 'express';
import { json } from 'body-parser';
import './controllers/LoginController';
import { myRouter } from './myRouter';

const app = express();
app.use(json());
app.use(myRouter.getMyRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000!!');
});
