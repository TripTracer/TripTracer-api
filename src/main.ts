import cookieParser from 'cookie-parser';
import { nestCsrf } from 'ncsrf';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // Or use console
  });
  // app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(nestCsrf());

  await app.listen(8000);
}
bootstrap();
