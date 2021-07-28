import { EntityRepository, Repository } from 'typeorm';
import { User } from './models/users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
