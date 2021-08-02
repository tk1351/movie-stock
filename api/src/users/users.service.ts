import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/users.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessage, UserInfo } from '../types/type';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Token, JwtPayload } from './types/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(user: UserInfo): Promise<User> {
    return await this.usersRepository.findOne({ sub: user.sub });
  }

  async createUser(createUserDto: CreateUserDto): Promise<IMessage> {
    return await this.usersRepository.createUser(createUserDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    const sub = await this.usersRepository.validateUserSub(authCredentialsDto);

    if (!sub) throw new UnauthorizedException('認証情報が無効です');

    const payload: JwtPayload = { sub };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
