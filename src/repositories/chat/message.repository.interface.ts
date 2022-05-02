import { IMessage } from '../../entity';

export interface IMessageRepository {
  createMessage(message: Partial<IMessage>): Promise<IMessage>;
}
