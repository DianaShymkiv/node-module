import {
  Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { CommonFieldsEntity, ICommonFields } from './commonFields.entity';
import { UserEntity } from './user.entity';
import { CommentEntity, IComment } from './comment.entity';
import { config } from '../config';

export interface IPost extends ICommonFields{
    title: string;
    text: string;
    userId: number;
    comments:IComment[];
}

@Entity('Posts', { database: config.MYSQL_DATABASE_NAME })
export class Post extends CommonFieldsEntity implements IPost {
    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      title: string;

    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      text: string;

    @Column({
      type: 'int',
    })
      userId: number;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
      user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
      comments: CommentEntity[];
}
