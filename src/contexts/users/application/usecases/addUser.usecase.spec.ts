import { Test, TestingModule } from '@nestjs/testing';
import { AddUserUseCase } from './addUser.usecase';
import { UsersService } from '../../domain/services/users.service';
import { userSchema } from '../dtos/userType';
import { err, ok } from 'neverthrow';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AddUserDomainException } from '../../domain/exceptions/AddUserDomainError';

describe('AddUserUseCase', () => {
  let useCase: AddUserUseCase;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AddUserUseCase,
        {
          provide: UsersService,
          useValue: {
            addNewUser: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<AddUserUseCase>(AddUserUseCase);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should run the add user useCase', () => {
    const mockedUser: userSchema = {
      username: 'testuser',
      id: 'testuserID',
    } as unknown as userSchema;

    jest.spyOn(userService, 'addNewUser').mockReturnValue(ok(mockedUser));

    const result = useCase.execute(mockedUser);
    expect(result).toBeTruthy();
    expect(result).toMatchObject(mockedUser);
    expect(result).toEqual(mockedUser);
  });

  it('should be rejected', async () => {
    const mockedUser: userSchema = {
      username: 'testuser',
      id: 'testuserID',
    };

    const error = new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    jest.spyOn(userService, 'addNewUser').mockReturnValue(err(error));

    try {
      await expect(useCase.execute(mockedUser)).rejects.toThrow(error);
    } catch (err) {
      expect(err).toBeInstanceOf(AddUserDomainException);
      expect(err.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(err.response).toBe('There is an error in adding a new user.');
      expect(userService.addNewUser).toHaveBeenCalledTimes(1);
      expect(userService.addNewUser).toHaveBeenCalledWith(mockedUser);
    }
  });
});
