import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
const userMockData = require('../__mocks__/user.json');

jest.mock('@prisma/client');
jest.mock('../services/prisma.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userMockData),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  it('should create a user and return that', async () => {
    const userCreateDto: CreateUserDto = userMockData;

    jest.spyOn(usersService, 'createUser').mockResolvedValue(userMockData);

    expect(await usersController.addUser(userCreateDto)).toBe(userMockData);
    expect(usersService.createUser).toHaveBeenCalledWith(userCreateDto);
  });
});
