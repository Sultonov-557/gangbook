import { RootEntity } from "src/common/entities/rootEntity";
import { Role } from "src/common/enums/userRole.enum";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends RootEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  logedout: boolean;

  @Column({ enum: Role, default: Role.user, type: "enum" })
  role: Role;

  @Column({ unique: true })
  email: string;
}
