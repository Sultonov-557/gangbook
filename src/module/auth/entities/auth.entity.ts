import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: number;

  @CreateDateColumn()
  updatedAt: number;
}
