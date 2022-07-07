import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { In, Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorResponse } from '../../utils/error.exception';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: User): Promise<User> {
    const someData = await this.userRepository.count({
      where: {
        phone: data.phone,
      },
    });
    if (someData > 0) {
      throw new ErrorResponse('用户已存在');
    }
    const res = this.userRepository.create(data);
    const result = this.userRepository.save(res);
    return result;
  }
  async findOne(name: string): Promise<User> {
    const res = await this.userRepository.findOne({
      where: { user_name: name },
    });
    if (!res) {
      throw new ErrorResponse('请先注册再登录');
    }
    return res;
  }
}
