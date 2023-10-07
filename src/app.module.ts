import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { PostModule } from './module/post/post.module';

@Module({
  imports: [AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
