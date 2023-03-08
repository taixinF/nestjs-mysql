import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from '../../../utils/types';
import { Profile } from '../../../typeorm/entities/Profile';
import { Post } from '../../../typeorm/entities/Posts';

@Injectable()
export class UsersService {
  //如何与数据库交互 我们需要将类型orm储存库注入我们的类
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly ProfileRepository: Repository<Profile>,
    @InjectRepository(Post) private readonly PostRepository: Repository<Post>,
  ) {}

  findUsers() {
    //平时如果我们普通查询是看不到关联的字段的 我们需要在里面加入一个选项
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(userDetails: CreateUserParams) {
    const user = this.userRepository.create({
      ...userDetails,
      createAt: new Date(),
    });

    return this.userRepository.save(user);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found.Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    // 创建不是异步方法
    const newProfile = this.ProfileRepository.create({
      ...createUserProfileDetails,
    });
    //返回的都是本身
    const saveProfile = await this.ProfileRepository.save(newProfile);
    user.profile = saveProfile;
    //解除疑惑点都是在创建后保存的
    return this.userRepository.save(user);
  }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found.Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );

    const newPost = this.PostRepository.create({
      ...createUserPostDetails,
      user,
    });

    return this.PostRepository.save(newPost);
  }
}
