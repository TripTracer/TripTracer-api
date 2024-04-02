import { Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenResponse } from './auth.entity';

@Resolver(() => TokenResponse)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => TokenResponse)
  async getTokens(
    @Args('userId') userId: string,
    @Args('username') username: string,
  ): Promise<TokenResponse> {
    const tokens = await this.authService.getTokens(userId, username);
    return tokens;
  }
}
