import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/users.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessage, UserInfo, GetUsersSubReturnType } from '../types/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUsersId(): Promise<GetUsersSubReturnType[]> {
    return await this.usersRepository.getUsersId();
  }

  async getUser(user: UserInfo): Promise<User> {
    return await this.usersRepository.findOne({ sub: user.sub });
  }

  async createUser(createUserDto: CreateUserDto): Promise<IMessage> {
    return await this.usersRepository.createUser(createUserDto);
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<IMessage> {
    return await this.usersRepository.createAdmin(createUserDto);
  }
}
