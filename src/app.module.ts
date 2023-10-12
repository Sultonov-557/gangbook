import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./module/auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseOptions } from "./common/config/database.config";
import { join } from "path";
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOptions),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "/src", "/public"),
      serveStaticOptions: { extensions: ["html"] },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
