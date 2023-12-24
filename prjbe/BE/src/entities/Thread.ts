import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Likes } from "./Likes";
import { Replies } from "./Replies";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  postedAt: Date;

  @ManyToOne(() => User, (user) => user.threads, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Likes, (likes) => likes.thread)
  likes: Likes[];

  @OneToMany(() => Replies, (replies) => replies.thread)
  replies: Replies[];
}
