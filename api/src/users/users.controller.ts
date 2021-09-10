import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { User } from './models/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessage, GetUsersSubReturnType } from '../types/type';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get('/id')
  getUsersId(): Promise<GetUsersSubReturnType[]> {
    return this.usersService.getUsersId();
  }

  @Post('/register')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<IMessage> {
    return this.usersService.createUser(createUserDto);
  }
}
