// Likes.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (users) => users.likes)
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.likes)
  thread: Thread;
}
