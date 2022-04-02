import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';
import { config } from './config';

const app = express();

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
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
    console.log(`Server is running on localhost:${PORT}`);
});
