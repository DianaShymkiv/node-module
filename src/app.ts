import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';

import { apiRouter } from './router';
import { config } from './config';
import { socketController } from './controller/socket.controller';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });
// allow go to server from all corses

io.on('connection', (socket: any) => {
  socket.on('message:send', async (data: any) => socketController.messageSend(socket, io, data));

  socket.on('join_room', async (data: any) => socketController.joinRoom(io, socket, data));

});

// @ts-ignore
global.rootDir = __dirname;

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(apiRouter);
// @ts-ignore
// app.use('*', (err, req, res, next) => {
//   res
//     .status(err.status || 500)
//     .json({
//       message: err.message,
//     });
// });

const { PORT } = config;

server.listen(PORT, async () => {
  console.log(`Server is running on localhost:${PORT}`);

  try {
    const connection = await createConnection();
    if (connection) {
      console.log('DB connected');
    }
    // cronRun();
  } catch (err) {
    if (err) console.log(err);
  }
});
