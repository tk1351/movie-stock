import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/models/users.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async getAuthUser(user: User): Promise<User> {
    const found = await this.findOne({ id: user.id });
    return found;
  }
}
