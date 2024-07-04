import { UseCase } from '@/contexts/shared/application/UseCase';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { userSchema } from '../dtos/userType';
import { ServerException } from '@/contexts/shared/exceptions/ServiceException';
import { AddUserDomainException } from '../../domain/exceptions/AddUserDomainError';
@Injectable()
export class GetUserByUserNameUseCase
  implements UseCase<{ username: string }, userSchema>
{
  constructor(private readonly userService: UsersService) {}

  async execute(request: { username: string }): Promise<userSchema> {
    const result = await this.userService.findUserByUserName(request.username);

    if (result.isErr()) {
      if (result.error instanceof ServerException) {
        throw new InternalServerErrorException(result.error);
      }

      throw new AddUserDomainException('There is an error in finding a user.');
    }

    return result.value;
  }
}
