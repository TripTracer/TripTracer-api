import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/add')
  async addUser(@Body() userCreateDto: CreateUserDto) {
    return this.userService.createUser(userCreateDto);
  }
}
