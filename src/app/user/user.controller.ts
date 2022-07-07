import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('用户管理')
@Controller('api/user')
export class UserController {
  constructor(private readonly uerService: UserService) {}
  @ApiOperation({ summary: '查找用户' })
  @Post('create')
  async getUser(@Body() data: any): Promise<any> {
    return this.uerService.createUser(data);
  }
  @ApiOperation({ summary: '查找用户' })
  @Get('findOne')
  async findOne(@Query('name') name: string): Promise<any> {
    return this.uerService.findOne(name);
  }
}
