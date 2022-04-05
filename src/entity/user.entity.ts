import { Column, Entity, OneToMany } from 'typeorm';

import { CommonFieldsEntity, ICommonFields } from './commonFields.entity';
import { IPost, Post } from './posts.entity';
import { CommentEntity, IComment } from './comment.entity';
import { config } from '../config';

export interface IUser extends ICommonFields{
    id:number;
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
    posts: IPost[];
    comments: IComment[];
}

// name of the table in which we reference
@Entity('Users', { database: config.MYSQL_DATABASE_NAME })
export class UserEntity extends CommonFieldsEntity implements IUser {
    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      firstName: string;

    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      lastName: string;

    @Column({
      type: 'int',
    })
      age?: number;

    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
      unique: true,
    })
      phone: string;

    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
      unique: true,
    })
      email: string;

    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      password: string;

    @OneToMany(() => Post, (post) => post.user)
      posts: Post[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
      comments: CommentEntity[];
}
