import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors: RegExp = new RegExp(JSON.parse(process.env.CORS)?.join('|'));
  app.enableCors({ origin: cors });
  await app.listen(3000);
}
bootstrap();
