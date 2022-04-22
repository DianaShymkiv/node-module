import express from 'express';
import http from 'http';
import 'reflect-metadata';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';

import { apiRouter } from './router';
import { config } from './config';
import { socketController } from './controller/socket.controller';
// import { cronRun } from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });
// allow go to server from all corses

io.on('connection', (socket: any) => {
  console.log('________________________');
  console.log(socket.handshake.query);
  console.log('________________________');

  socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));

  socket.on('join_room', (data: any) => {
    socket.join(data.id);

    //  ONE TO MANY AVOID SENDER
    socket.broadcast.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined to room ${data.id}` });

    // ONE TO ALL USERS IN THE ROOM INCLUDE SENDER
    io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined to room ${data.id}` });
  });


});
// when new user connected to socket (front) / socket => info about this user

// @ts-ignore
global.rootDir = __dirname;

app.use(fileUpload());
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
