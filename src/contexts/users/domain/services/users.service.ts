import { Injectable } from '@nestjs/common';
import { userSchema } from '../../application/dtos/userType';
import { Result, ok } from 'neverthrow';

@Injectable()
export class UsersService {
  private readonly users: Array<userSchema> = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  getAllUsers(): Result<Array<userSchema>, Error> {
    return ok(this.users);
  }

  addNewUser(user: userSchema): Result<userSchema, Error> {
    this.users.push(user);
    return ok(user);
  }

  async findUserByUserName(
    username: string,
  ): Promise<Result<userSchema | undefined, Error>> {
    return ok(this.users.find((user) => user.username === username));
  }
}
