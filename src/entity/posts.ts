import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user';
import { Comment, IComment } from './comment';
import { config } from '../config';

export interface IPost extends ICommonFields{
    title: string;
    text: string;
    userId: number;
    comments:IComment[];
}

@Entity('Posts', { database: config.MYSQL_DATABASE_NAME })
export class Post extends CommonFields implements IPost {
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

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];
}
