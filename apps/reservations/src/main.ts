import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService)
  const port = configService.get("RESERVATION_PORT");
  await app.listen( port , () => {
    console.log(`App is running on port ${port}`);
  });
}
bootstrap();
