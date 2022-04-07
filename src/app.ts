import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';
import { config } from './config';
import { cronRun } from './cron';

const app = express();

// @ts-ignore
global.rootDir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
    });
});

const { PORT } = config;

app.listen(PORT, async () => {
  console.log(`Server is running on localhost:${PORT}`);

  try {
    const connection = await createConnection();
    if (connection) {
      console.log('DB connected');
    }
    cronRun();
  } catch (err) {
    if (err) console.log(err);
  }
});
