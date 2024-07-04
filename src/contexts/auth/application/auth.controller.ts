import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../domain/services/auth.service';
import { AuthGuard } from '../infrastructure/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() refreshTokenDto: { refreshToken: string }) {
    return await this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
