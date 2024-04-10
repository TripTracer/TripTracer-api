import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UsersResolver } from './users.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, PrismaService, UsersResolver, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
