import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SimpleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('No authorization token provided.');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new ForbiddenException('Invalid or missing token.');
    }

    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new ForbiddenException('Token validation failed.');
    }
  }
}
