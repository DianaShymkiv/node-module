import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFieldsEntity, ICommonFields } from './commonFields.entity';
import { UserEntity } from './user.entity';
import { config } from '../config';
import { ActionTokenTypes } from '../constants';

export interface IActionToken extends ICommonFields{
  actionToken: string;
  type: ActionTokenTypes;
  userId: number;
}

export interface IActionTokenForSave {
  actionToken: string;
  type: ActionTokenTypes;
  userId: number;
}

@Entity('ActionTokens', { database: config.MYSQL_DATABASE_NAME })
export class ActionToken extends CommonFieldsEntity implements IActionToken {
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
    actionToken: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
    type: ActionTokenTypes;

  @Column({
    type: 'int',
  })
    userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
    user: UserEntity;
}
