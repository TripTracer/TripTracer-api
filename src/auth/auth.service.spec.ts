import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { userMockData } from '../__mocks__/user.mock';

jest.mock('@prisma/client');
jest.mock('../users/users.service');
jest.mock('../users/users.entity');

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mockedToken'),
};

const mockConfigService = {
  get: jest.fn().mockImplementation((key: string) => {
    if (key === 'JWT_ACCESS_SECRET') return 'access_secret';
    if (key === 'JWT_REFRESH_SECRET') return 'refresh_secret';
    return null;
  }),
};

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    jwtService = new JwtService();
    configService = new ConfigService();

    jwtService.signAsync = jest
      .fn()
      .mockResolvedValueOnce('mockedAccessToken')
      .mockResolvedValueOnce('mockedRefreshToken');
    configService.get = jest.fn((key) => {
      if (key === 'JWT_ACCESS_SECRET') return 'access_secret';
      if (key === 'JWT_REFRESH_SECRET') return 'refresh_secret';
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        {
          provide: UsersService,
          useValue: {
            users: {
              getUser: jest.fn().mockResolvedValue(userMockData),
              getUsers: jest.fn().mockResolvedValue(userMockData),
              createUser: jest.fn().mockResolvedValue(userMockData),
              updateUser: jest.fn().mockResolvedValue(userMockData),
              deleteUser: jest.fn().mockResolvedValue(userMockData),
              findByUsername: jest.fn().mockResolvedValue(userMockData),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).not.toBeDefined();
  });
});
