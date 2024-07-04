import { HttpException, HttpStatus } from '@nestjs/common';

export class BlogDomainException extends HttpException {
  constructor(message: string) {
    super('Forbidden', HttpStatus.FORBIDDEN);
    this.name = message;
  }
}
