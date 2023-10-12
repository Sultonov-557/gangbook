import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RootEntity {
  @PrimaryGeneratedColumn()
  ID: number;
}
