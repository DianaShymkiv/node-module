import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const app = express();

// app.get('/users',async (req: Request, res: Response) => {
//     await getManager().getRepository();
//     res.end();
// });

app.listen(5500, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
    console.log('Server is running in localhost:5500');
});
