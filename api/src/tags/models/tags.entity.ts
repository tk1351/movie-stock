import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movies.entity';

@Entity({ name: 'tags' })
export class Tag extends DefaultEntity {
  @Column()
  text: string;

  @ManyToOne(() => Movie, (movie) => movie.tags, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  @Column()
  movieId: number;
}
