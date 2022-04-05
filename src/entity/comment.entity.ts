import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFieldsEntity } from './commonFields.entity';
import { UserEntity } from './user.entity';
import { Post } from './posts.entity';

export interface IComment {
    text: string;
    authorId: number;
    postId: number;
    likes: number;
    dislike: number;
}

@Entity('Comments', { database: 'root' })
export class CommentEntity extends CommonFieldsEntity implements IComment {
    @Column({
      type: 'varchar',
      width: 255,
      nullable: false,
    })
      text: string;

    @Column({
      type: 'int',
      nullable: false,
    })
      authorId: number;

    @Column({
      type: 'int',
      nullable: false,
    })
      postId: number;

    @Column({
      type: 'int',
    })
      likes: number;

    @Column({
      type: 'int',
    })
      dislike: number;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
      post: Post;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
      user: UserEntity;
}
