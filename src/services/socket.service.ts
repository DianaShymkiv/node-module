class SocketService {
  public getNewMessage(io: any, room: number, message: string, firstName: string, lastName: string) {
    switch (room) {
    case 0:
      io.emit('message:get-new-message', {
        message,
        firstName,
        lastName,
      });
      break;
    case 1:
      io.to(room)
        .emit('message:get-new-message', {
          message,
          firstName,
          lastName,
        });
      break;
    case 2:
      io.to(room)
        .emit('message:get-new-message', {
          message,
          firstName,
          lastName,
        });
      break;
    case 3:
      io.to(room)
        .emit('message:get-new-message', {
          message,
          firstName,
          lastName,
        });
      break;
    default:
      break;
    }
  }
}

export const socketService = new SocketService();
