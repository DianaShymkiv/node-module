import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    // const users = await getManager().getRepository(User).find();
    // const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    // // для того щоб в юзерах відображались пости
    // console.log(users);
    // res.json(users);

    // //////////////////////////////////////////////////////////////////////////////////////////
    const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .where('posts.text = "asd"')
        .getMany();
    res.json(users);
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    const createUser = await getManager().getRepository(User).save(req.body);
    res.json(createUser);
});

app.put('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createUser);
});

app.delete('/users/:id', async (req, res) => {
    const createUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(createUser);
});

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
