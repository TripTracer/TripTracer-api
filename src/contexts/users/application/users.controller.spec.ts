import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { NewUserSchema } from './dtos/addNewUser';
import { AddUserUseCase } from './usecases/addUser.usecase';
import { userSchema } from './dtos/userType';

describe('UsersController', () => {
  let controller: UsersController;
  let addUserUseCase: AddUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AddUserUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    addUserUseCase = module.get<AddUserUseCase>(AddUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should returns all users', () => {
    const result = controller.getAllUsers();
    expect(result).toBe('This action returns all cats');
  });

  describe('Add new user', () => {
    it('should add a new user', () => {
      const mockedUser = {
        username: 'testuser',
        password: 'testpass',
      };
      const mockedUserRequest = {
        body: mockedUser,
      } as unknown as Request;
      const result = controller.addNewUser(mockedUserRequest);
      expect(result).toHaveProperty('username', 'testuser');
      expect(result).toHaveProperty('password', 'testpass');
      expect(result).toMatchObject(mockedUser);
    });
  });

  describe('Add new user by Body and zod', () => {
    it('should add a new user', () => {
      const mockedUser: NewUserSchema = {
        username: 'testuser',
        password: 'testpass',
      };

      const expectedResult: userSchema = {
        username: 'john',
        id: 'userIDSTUB',
      };

      jest.spyOn(addUserUseCase, 'execute').mockReturnValue(expectedResult);

      const result = controller.addNewUserByBody(mockedUser);
      expect(result).toEqual(expectedResult);
      expect(result).toHaveProperty('username', expectedResult.username);
      expect(result).toMatchObject(expectedResult);
      expect(result).toStrictEqual(expectedResult);
      expect(addUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(addUserUseCase.execute).toHaveBeenCalledWith(mockedUser);
    });
  });
});
