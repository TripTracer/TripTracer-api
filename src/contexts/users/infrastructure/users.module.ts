import { Module } from '@nestjs/common';
import { UsersController } from '../application/users.controller';
import { AddUserUseCase } from '../application/usecases/addUser.usecase';
import { UsersService } from '../domain/services/users.service';
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [AddUserUseCase, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
