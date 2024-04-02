import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const userMockData = require('../__mocks__/user.json');

jest.mock('@prisma/client');
jest.mock('../users/users.service');

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
        // {
        //   provide: UsersService,
        //   useValue: {
        //     users: {
        //       getUser: jest.fn().mockResolvedValue(userMockData),
        //       getUsers: jest.fn().mockResolvedValue(userMockData),
        //       createUser: jest.fn().mockResolvedValue(userMockData),
        //       updateUser: jest.fn().mockResolvedValue(userMockData),
        //       deleteUser: jest.fn().mockResolvedValue(userMockData),
        //       findByUsername: jest.fn().mockResolvedValue(userMockData),
        //     },
        //   },
        // },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    // usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    // expect(usersService).not.toBeDefined();
  });

  it('should generate access and refresh tokens', async () => {
    const userId = '123';
    const username = 'testUser';

    const tokens = await authService.getTokens(userId, username);

    // Check that jwtService.signAsync was called correctly
    expect(mockJwtService.signAsync).toHaveBeenNthCalledWith(
      1,
      {
        sub: userId,
        username,
      },
      {
        secret: 'access_secret',
        expiresIn: '15m',
      },
    );

    expect(mockJwtService.signAsync).toHaveBeenNthCalledWith(
      2,
      {
        sub: userId,
        username,
      },
      {
        secret: 'refresh_secret',
        expiresIn: '7d',
      },
    );

    // Check that configService.get was called with the correct args
    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_ACCESS_SECRET');
    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_REFRESH_SECRET');

    // Check the returned tokens
    expect(tokens).toEqual({
      accessToken: 'mockedToken',
      refreshToken: 'mockedToken',
    });
  });

  // it('signUp: Check if user exists', () => {
  //   const result = await authService.signUp();
  //   expect(usersService).toBeDefined();
  // });
});
