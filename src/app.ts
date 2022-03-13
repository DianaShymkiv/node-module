import express, { Request, Response } from 'express';
import { users } from './users';

const app = express();

console.log(users);

app.get('/', (req: Request, res: Response) => {
    res.end();
});

app.listen(5500, () => {
    console.log('Server is running in localhost:5500');
});
