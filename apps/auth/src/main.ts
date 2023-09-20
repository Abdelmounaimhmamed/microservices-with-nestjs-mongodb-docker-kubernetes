import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import  * as  CookieParser from "cookie-parser";
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(CookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useLogger(app.get(Logger));
  app.connectMicroservice({
    transport: Transport.TCP
  })
  await app.startAllMicroservices()
  const configService = app.get(ConfigService)
  const port = configService.get("AUTH_PORT");
  await app.listen(port || 3002 , () => { console.log(`App is running on Port ${port}`)});
}

bootstrap();
