import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFieldsEntity } from './commonFields.entity';
import { UserEntity } from './user.entity';
import { config } from '../config';

export interface IMessage {
  message: string;
  userId: number;
  likes: number;
  dislike: number;
}

@Entity('Chat', { database: config.MYSQL_DATABASE_NAME })
export class Message extends CommonFieldsEntity implements IMessage {
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
    message: string;

  @Column({
    type: 'int',
    nullable: false,
  })
    userId: number;

  @Column({
    type: 'int',
  })
    likes: number;

  @Column({
    type: 'int',
  })
    dislike: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'authorId' })
    user: UserEntity;
}
