import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { User } from './models/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessage } from '../types/type';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Token } from './types/types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Post('/register')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<IMessage> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Token> {
    return this.usersService.login(authCredentialsDto);
  }
}
