import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { NewUserSchema } from './dtos/addNewUser';
import { AddUserUseCase } from './usecases/addUser.usecase';
import { Roles } from '@/shared/infrastructure/nest/roles/roles.decorator';
import { Role } from '@/shared/infrastructure/types/user.roles';
import { AuthGuard } from '@/contexts/auth/infrastructure/auth.guard';
import { RolesGuard } from '@/shared/infrastructure/nest/roles/roles.guard';

@Controller('users')
export class UsersController {
  roles: Role[];
  constructor(private readonly addUserUseCase: AddUserUseCase) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  getAllUsers(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  getUser(@Param() id: string): string {
    const userId = id;
    return userId;
  }

  @Post('/new')
  addNewUser(@Req() request: Request) {
    const { body } = request;
    return body;
  }

  @Post('/add')
  addNewUserByBody(@Body() request: NewUserSchema): NewUserSchema {
    const result = this.addUserUseCase.execute(request);

    return result;
  }
}
