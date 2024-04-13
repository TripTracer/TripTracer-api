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
// import { Body, Controller, Get, Post, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
// import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signup')
  // signup(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signUp(createUserDto);
  // }

  // @Post('signin')
  // signin(@Body() data: AuthDto) {
  //   return this.authService.signIn(data);
  // }

  // @Get('logout')
  // logout(@Req() req: Request) {
  //   this.authService.logout(req.user['sub']);
  // }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
