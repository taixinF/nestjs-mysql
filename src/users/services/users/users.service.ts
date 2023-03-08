import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import { CreateUserParams } from '../../../utils/types';

@Injectable()
export class UsersService {
  //如何与数据库交互 我们需要将类型orm储存库注入我们的类
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUsers() {}

  createUser(userDetails: CreateUserParams) {
    const user = this.userRepository.create({
      ...userDetails,
      createAt: new Date(),
    });

    return this.userRepository.save(user);
  }
}
