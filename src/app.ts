import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = process.env;

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
