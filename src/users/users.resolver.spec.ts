import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserStatus } from './users.entity';
import { userMockData } from 'src/__mocks__/user.mock';

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

    it('should handle multiple concurrent user creations correctly', async () => {
      const createUserInput = { ...userMockData };
      const createUserPromises = [];

      for (let i = 0; i < 10; i++) {
        createUserPromises.push(
          resolver.createUser({
            ...createUserInput,
            email: `test${i}@example.com`,
          }),
        );
      }

      const results = await Promise.all(createUserPromises);
      results.forEach((result) => {
        expect(result).toHaveProperty('email');
      });
      expect(userService.createUser).toHaveBeenCalledTimes(10);
    });

    it('should reject user creation with invalid email format', async () => {
      const invalidEmailUser = { ...userMockData, email: 'not-an-email' };
      await expect(resolver.createUser(invalidEmailUser)).rejects.toThrow(
        'Invalid email format',
      );
    });

    it('should enforce minimum password length', async () => {
      const shortPasswordUser = { ...userMockData, password: '123' };
      await expect(resolver.createUser(shortPasswordUser)).rejects.toThrow(
        'Password must be at least 8 characters',
      );
    });

    it('should not return sensitive data in the response', async () => {
      const result = await resolver.createUser(userMockData);
      expect(result.password).toBeUndefined();
    });

    it('should store hashed passwords', async () => {
      await resolver.createUser(userMockData);
      expect(userService.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          password: expect.not.stringContaining(userMockData.password),
        }),
      );
    });
    it('should allow user creation only with valid admin token', async () => {
      const context = { user: { role: 'admin' } }; // Simulate an admin user context
      jest.spyOn(authService, 'verifyToken').mockResolvedValue(context.user);

      await expect(
        resolver.createUser(userMockData, context),
      ).resolves.toHaveProperty('email');
      expect(userService.createUser).toHaveBeenCalledWith(userMockData);
    });

    it('should reject user creation with non-admin token', async () => {
      const context = { user: { role: 'user' } }; // Simulate a non-admin user context
      jest.spyOn(authService, 'verifyToken').mockResolvedValue(context.user);

      await expect(resolver.createUser(userMockData, context)).rejects.toThrow(
        'Unauthorized',
      );
    });
    it('should allow creating a user with admin role only by admins', async () => {
      const adminUserInput = { ...userMockData, role: 'admin' };
      const context = { user: { role: 'admin' } }; // Simulate an admin user context

      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValueOnce(adminUserInput);
      await expect(
        resolver.createUser(adminUserInput, context),
      ).resolves.toHaveProperty('role', 'admin');
    });

    it('should not allow non-admins to create an admin user', async () => {
      const adminUserInput = { ...userMockData, role: 'admin' };
      const context = { user: { role: 'user' } }; // Simulate a non-admin user context

      await expect(
        resolver.createUser(adminUserInput, context),
      ).rejects.toThrow('Unauthorized');
    });
  });
});
