import { env } from "./env.config";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const databaseOptions: MysqlConnectionOptions = {
  type: "mysql",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
};
