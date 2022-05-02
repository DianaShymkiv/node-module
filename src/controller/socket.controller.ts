import { messageRepository, userRepository } from '../repositories';
import { IUser } from '../entity';
import { socketService } from '../services/socket.service';

class SocketController {
  public async messageSend(socket: any, io: any, data: any): Promise<void> {
    const { userId } = socket.handshake.query;
    const {
      firstName,
      lastName,
    } = await userRepository.getUserById(+userId) as IUser;
    const {
      message,
      room,
    } = data;

    await socketService.getNewMessage(io, room, message, firstName, lastName);

    await messageRepository.createMessage({ message, userId });
  }

  public async joinRoom(io: any, socket: any, data: any) {
    const { userId } = socket.handshake.query;
    const {
      firstName,
      lastName,
    } = await userRepository.getUserById(+userId) as IUser;

    socket.join(data.id);
    io.to(data.id)
      .emit('user_join_room', { message: `User ${firstName} ${lastName} joined room ${data.id}` });
  }
}

export const socketController = new SocketController();
