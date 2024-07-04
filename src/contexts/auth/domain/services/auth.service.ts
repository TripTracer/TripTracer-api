import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserByUserNameUseCase } from '../../../users/application/usecases/getByUsername.usecase';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/shared/constants/jwtConstants';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUserByUserNameUseCase: GetUserByUserNameUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.getUserByUserNameUseCase.execute({ username });

    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const payload = {
      sub: user.userId,
      username: user.username,
      roles: user.roles || 'user',
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessSecret,
        expiresIn: jwtConstants.accessTokenExpiresIn,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshTokenExpiresIn,
      }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      const newPayload = {
        sub: payload.sub,
        username: payload.username,
        roles: payload.roles || 'user',
      };
      return {
        access_token: await this.jwtService.signAsync(newPayload, {
          secret: jwtConstants.accessSecret,
          expiresIn: jwtConstants.accessTokenExpiresIn,
        }),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
