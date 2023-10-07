import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect, queryAll } from './database/database';

async function bootstrap() {
  await connect({
    user: 'root',
    password: 'root',
    port: 3000,
    host: '127.0.0.1',
    database: 'gangbook',
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(80, () => {
    console.log('server listening on port 80');
  });
}
bootstrap();
