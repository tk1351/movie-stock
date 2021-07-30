import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movies.entity';

@Entity({ name: 'studios' })
export class Studio extends DefaultEntity {
  @Column()
  studio: string;

  @ManyToOne(() => Movie, (movie) => movie.studios, { eager: false })
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  @Column()
  movieId: number;
}
