import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { authMessages } from 'src/messages/auth.messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req) {
      throw new UnauthorizedException(authMessages.noRequestFound);
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        authMessages.authorizationHeaderIsMissing,
      );
    }

    const [type, token] = authHeader.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(authMessages.invalidOrMissingToken);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      req['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(authMessages.tokenIsInvalidOrExpired);
    }
  }
}
