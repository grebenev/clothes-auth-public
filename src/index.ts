import { connect } from 'mongoose';

import { app } from './app';

// start
async function start() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not defined');
  }

  try {
    await connect(process.env.MONGO_URI);
    console.log('Connected to Mongo Db');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
}

start();
