import express from 'express';
import { json } from 'body-parser';
import './controllers/LoginController';
import { router } from './decorators/classDecorators';

const app = express();
app.use(json());
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
