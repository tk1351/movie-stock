import { Entity, Unique, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movies.entity';

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

  @OneToMany(() => Movie, (movies) => movies.user, { eager: true })
  movies: Movie[];
}
