import { Module } from '@nestjs/common';
import { UsersModule } from '@/contexts/users/infrastructure/users.module';
import { AuthService } from '../domain/services/auth.service';
import { AuthController } from '../application/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/shared/constants/jwtConstants';
import { GetUserByUserNameUseCase } from '@/contexts/users/application/usecases/getByUsername.usecase';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.accessSecret,
      signOptions: { expiresIn: jwtConstants.accessTokenExpiresIn },
    }),
  ],
  providers: [AuthService, JwtService, GetUserByUserNameUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
