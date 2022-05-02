import { EntityRepository, getManager } from 'typeorm';

import { IMessage, Message } from '../../entity';
import { IMessageRepository } from './message.repository.interface';

@EntityRepository(Message)
class MessageRepository implements IMessageRepository {
  public async createMessage(message: Partial<IMessage>): Promise<IMessage> {
    return getManager().getRepository(Message).save(message);
  }
}

export const messageRepository = new MessageRepository();
