import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/users.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessage } from '../types/type';
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

  async createUser(createUserDto: CreateUserDto): Promise<IMessage> {
    return await this.usersRepository.createUser(createUserDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    const email = await this.usersRepository.validateUserSub(
      authCredentialsDto,
    );

    if (!email) throw new UnauthorizedException('認証情報が無効です');

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
