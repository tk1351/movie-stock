import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/models/users.entity';
import { UserInfo } from '../types/type';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async getAuthUser(user: UserInfo): Promise<User> {
    try {
      const found = await this.findOne(
        { sub: user.sub },
        { select: ['id', 'name', 'role'] },
      );
      return found;
    } catch (e) {
      throw new NotFoundException('ユーザーが存在しません');
    }
  }
}
