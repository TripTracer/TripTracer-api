import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './contexts/auth/application/auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared/domain/exceptions/GlobalExceptionFilter';
import { AuthService } from './contexts/auth/domain/services/auth.service';
import { GetUserByUserNameUseCase } from './contexts/users/application/usecases/getByUsername.usecase';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './contexts/auth/infrastructure/auth.module';
import { UsersModule } from './contexts/users/infrastructure/users.module';
@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AuthService,
    GetUserByUserNameUseCase,
    JwtService,
  ],
})
export class AppModule {}
