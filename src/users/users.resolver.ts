import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  CheckIfUserExistsResponse,
  CreateUserInput,
  UserResponse,
} from './users.entity';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => CheckIfUserExistsResponse)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => CheckIfUserExistsResponse)
  @UseGuards(AuthGuard)
  async checkIfUserExists(
    @Args('type') type: string,
    @Args('value') value: string,
  ): Promise<CheckIfUserExistsResponse> {
    const userWhereUniqueInput: Prisma.usersWhereUniqueInput = {
      [type]: value,
    } as unknown as Prisma.usersWhereUniqueInput;
    const userExists = await this.userService.getUser(userWhereUniqueInput);
    return { isUser: !!userExists };
  }

  @Mutation(() => UserResponse)
  @UseGuards(AuthGuard)
  async createUser(
    @Args('userData') createUserInput: CreateUserInput,
  ): Promise<UserResponse> {
    {
      const userResult: UserResponse = (await this.userService.createUser(
        createUserInput,
      )) as UserResponse;
      return userResult;
    }
  }
}
