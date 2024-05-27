import { Csrf } from 'ncsrf';

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

import { AuthGuard } from './auth.guard';
// import { Body, Controller, Get, Post, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

// import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Csrf()
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('csrf-token')
  getCsrfToken(@Request() req): any {
    return {
      token: req.csrfToken(),
    };
  }
}
