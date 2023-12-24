// Follows.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  followed: User;

  @ManyToOne(() => User, (user) => user.following)
  follower: User;
}
