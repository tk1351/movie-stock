import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './models/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessage, GetUsersSubReturnType } from '../types/type';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsersId(): Promise<GetUsersSubReturnType[]> {
    const result = await this.createQueryBuilder('users')
      .select(['users.id'])
      .getMany();

    return result;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IMessage> {
    const { name, email, sub, picture } = createUserDto;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.sub = sub;
    user.picture = picture;
    user.role = 'user';

    try {
      await user.save();
      return { message: 'ユーザー登録が完了しました' };
    } catch (e) {
      if (e.code === '23505')
        throw new ConflictException('このメールアドレスは既に登録されています');
      throw new InternalServerErrorException();
    }
  }

  async validateUserSub(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, sub } = authCredentialsDto;

    const user = await this.createQueryBuilder('users')
      .addSelect('users.email')
      .where('users.email = :email', { email })
      .andWhere('users.sub = :sub', { sub })
      .getOne();

    if (user) {
      return user.email;
    } else {
      return null;
    }
  }
}
