import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../services/prisma.service';
import { Prisma, users as PrismaUser } from '@prisma/client';
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
              findUnique: jest
                .fn()
                .mockResolvedValue(Promise<PrismaUser | null>),
              findMany: jest.fn().mockResolvedValue(Promise<PrismaUser[]>),
              create: jest.fn().mockResolvedValue(Promise<PrismaUser>),
              update: jest.fn().mockResolvedValue(Promise<PrismaUser>),
              delete: jest.fn().mockResolvedValue(Promise<PrismaUser>),
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
      const result = await service.user({ id: '1' });
      expect(result).toEqual(userMockData);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  // Add tests for `users`, `createUser`, `updateUser`, `deleteUser` similarly
});
