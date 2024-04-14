import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserStatus } from './users.entity';
import { userMockData } from '../__mocks__/user.mock';
jest.mock('../auth/auth.guard');

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            getUser: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('checkIfUserExistsResponse', () => {
    it('should return true if user exists', async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(userMockData);

      const result = await resolver.checkIfUserExists(
        'email',
        'johndoe@example.com',
      );
      expect(result).toEqual({ isUser: true });
      expect(userService.getUser).toHaveBeenCalledWith({
        email: 'johndoe@example.com',
      });
      expect(userService.getUser).toHaveBeenCalledTimes(1);
    });

    it('should return false if user does not exist', async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(null);

      const result = await resolver.checkIfUserExists(
        'email',
        'nonexistent@example.com',
      );
      expect(result).toEqual({ isUser: false });
      expect(userService.getUser).toHaveBeenCalledWith({
        email: 'nonexistent@example.com',
      });
      expect(userService.getUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(userMockData);
      const result = await resolver.createUser(userMockData);
      expect(result).toEqual(userMockData);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
    });

    it('should create a new user successfully', async () => {
      const createUserInput = {
        id: 'sample-user-id',
        username: 'john_doe',
        mobile: '+1234567890',
        email: 'johndoe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed_password_string',
        role: 'user',
        isVerified: false,
        status: UserStatus.PENDING,
        DOB: new Date('1990-01-01T00:00:00.000Z'),
        address: '123 Main St, Anytown, AN',
        cratedAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-01T00:00:00.000Z'),
        lastLogin: new Date('2023-01-01T00:00:00.000Z'),
        twoFactorEnabled: false,
        language: 'English',
        timeZone: 'GMT',
      };

      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValueOnce(createUserInput);

      const result = await resolver.createUser(createUserInput);
      expect(result).toEqual(createUserInput);
      expect(userService.createUser).toHaveBeenCalledWith(createUserInput);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
    });
  });
});
