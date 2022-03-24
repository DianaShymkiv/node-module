import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { Comment } from './comment';

export interface IPost {
    title: string;
    text: string;
    userId: number;
    comments:any[];
}

@Entity('Posts', { database: 'root' })
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
