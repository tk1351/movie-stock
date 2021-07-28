import { Entity, Unique, Column } from 'typeorm';
import { DefaultEntity } from '../../entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends DefaultEntity {
  @Column()
  name: string;

  @Column({ select: false })
  email: string;

  @Column()
  sub: string;

  @Column()
  picture: string;

  @Column()
  role: 'user' | undefined;
}
