import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorResponse extends HttpException {
  constructor(msg, status = HttpStatus.OK) {
    super(msg, status);
  }
}
