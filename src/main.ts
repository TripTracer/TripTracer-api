import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // Or use console
  });
  // app.useGlobalPipes(new ValidationPipe());
  console.log(`🚀 Service ready at port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
