import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../services/prisma.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const userMockData = require('../__mocks__/user.json');

jest.mock('@prisma/client');
jest.mock('../services/prisma.service');

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn().mockResolvedValue(userMockData),
              findMany: jest.fn().mockResolvedValue(userMockData),
              create: jest.fn().mockResolvedValue(userMockData),
              update: jest.fn().mockResolvedValue(userMockData),
              delete: jest.fn().mockResolvedValue(userMockData),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('user', () => {
    it('should return a user by unique identifier', async () => {
      const result = await service.getUser({ id: '1' });
      expect(result).toEqual(userMockData);
      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findByUsername method', () => {
    it('should return Null when username has not passed', async () => {
      const result = await service.findByUsername('');
      expect(result).toEqual(null);
    });

    it('should return the user when username has passed', async () => {
      const result = await service.findByUsername('john_doe');
      expect(result).toEqual(userMockData);
    });
  });

  // Add tests for `users`, `createUser`, `updateUser`, `deleteUser` similarly
});
