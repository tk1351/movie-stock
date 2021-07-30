import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movies.entity';

@Entity({ name: 'countries' })
export class Country extends DefaultEntity {
  @Column()
  country: string;

  @ManyToOne(() => Movie, (movie) => movie.countries, { eager: false })
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  @Column()
  movieId: number;
}
