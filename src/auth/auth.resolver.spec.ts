import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

const mockAuthService = {
  getTokens: jest.fn((userId, username) => {
    return Promise.resolve({
      accessToken: `mockAccessTokenFor-${username}`,
      refreshToken: `mockRefreshTokenFor-${userId}`,
    });
  }),
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return tokens for a given userId and username', async () => {
    const userId = '1';
    const username = 'testUser';
    const result = await resolver.getTokens(userId, username);

    expect(result).toEqual({
      accessToken: `mockAccessTokenFor-${username}`,
      refreshToken: `mockRefreshTokenFor-${userId}`,
    });
    expect(mockAuthService.getTokens).toHaveBeenCalledWith(userId, username);
    expect(mockAuthService.getTokens).toHaveBeenCalledTimes(1);
  });
});
