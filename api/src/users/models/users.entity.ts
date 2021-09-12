import { Entity, Unique, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movies.entity';
import { WatchList } from '../../watch-list/models/watch-list.entity';

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
  role: 'user' | 'admin' | undefined;

  @OneToMany(() => Movie, (movies) => movies.user)
  movies: Movie[];

  @OneToMany(() => WatchList, (watchList) => watchList.user, { nullable: true })
  watchList: WatchList[];
}
