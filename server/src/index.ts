import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { setUpMockData } from './utils';
import itemRoutes from './api/item/item.routes';
import userRoutes from './api/user/user.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import startWsServer from './web-socket';

const app = express();

// required environment variables that we are not able to run the server without them
const REQUIRED_VARIABLES = ['MONGO_URL'];

(async () => {
  try {
    // validate required environment variables
    for (const variable of REQUIRED_VARIABLES) {
      if (!process.env[variable]) {
        throw new Error(`environment variable ${variable} is missing.`);
      }
    }

    startWsServer();

    // connect to mongodb
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    console.log('Connected to mongoDB successfully.');

    // set up mock data
    await setUpMockData();

    // start server
    app.listen(config.server.port, () => console.log(`Server run on port ${config.server.port}`));

    app.use(bodyParser.json());
    app.use(cors());

    app.use('/items', itemRoutes);
    app.use('/users', userRoutes);

    app.use('*', (req, res) => {
      res.status(404).send('Sometimes when you lose your way, you find YOURSELF!');
    });
  } catch (err) {
    console.error('Error starting the server', err);
    process.exit(1);
  }
})();


