import { HttpException, HttpStatus } from '@nestjs/common';

export class AddUserDomainException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    // this.name = message;
  }
}
