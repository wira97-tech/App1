// Replies.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Thread } from './Thread';

@Entity()
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.replies)
  user: User;

  @ManyToOne(() => Thread, thread => thread.replies)
  thread: Thread;
}
