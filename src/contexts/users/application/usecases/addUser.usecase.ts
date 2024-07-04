import { UseCase } from '@/contexts/shared/application/UseCase';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewUserSchema } from '../dtos/addNewUser';
import { UsersService } from '../../domain/services/users.service';
import { userSchema } from '../dtos/userType';
import { AddUserDomainException } from '../../domain/exceptions/AddUserDomainError';
import { ServerException } from '@/contexts/shared/exceptions/ServiceException';
@Injectable()
export class AddUserUseCase implements UseCase<NewUserSchema, userSchema> {
  constructor(private readonly userService: UsersService) {}

  execute(request: NewUserSchema): userSchema {
    const result = this.userService.addNewUser(request);

    if (result.isErr()) {
      if (result.error instanceof ServerException) {
        throw new InternalServerErrorException(result.error);
      }

      throw new AddUserDomainException(
        'There is an error in adding a new user.',
      );
    }

    return result.value;
  }
}
