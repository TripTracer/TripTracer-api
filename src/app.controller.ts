import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @HttpCode(HttpStatus.BAD_REQUEST)
  @Get()
  getHello(): string {
    return "Please don't call this URL directly.";
  }
}
