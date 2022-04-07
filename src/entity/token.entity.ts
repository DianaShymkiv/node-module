import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFieldsEntity, ICommonFields } from './commonFields.entity';
import { UserEntity } from './user.entity';
import { config } from '../config';

export interface IToken extends ICommonFields{
    refreshToken: string;
    accessToken: string;
    userId: number;
}

// Ми зберігаємо token в базі тому що при логаут або коли ходимо по платформі
// ми мало того що розшифровуємо їх ( перевіряємо чи розшифровуються) ми перевіряємо чи
// це наші токени, а щоб це зробити ми його зберігаємо в базі, бо якщо токен
// розшифровується, він валідний але його немає в базі то він крадений або
// згенерований штучно по наших ключах. І коли ми робимо логаут ми видаляємо і з бази

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })
export class Token extends CommonFieldsEntity implements IToken {
    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      refreshToken: string;

    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      accessToken: string;

    @Column({
      type: 'int',
    })
      userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
      user: UserEntity;
}
