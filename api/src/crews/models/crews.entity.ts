import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movies.entity';

@Entity({ name: 'crews' })
export class Crew extends DefaultEntity {
  @Column()
  category: 1 | 2 | 3 | 4;

  @Column()
  name: string;

  @ManyToOne(() => Movie, (movie) => movie.crews, { eager: false })
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  @Column()
  movieId: number;
}
