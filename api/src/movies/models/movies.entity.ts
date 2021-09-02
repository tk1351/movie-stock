import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { User } from '../../users/models/users.entity';
import { Tag } from '../../tags/models/tags.entity';
import { Crew } from '../../crews/models/crews.entity';
import { Country } from '../../countries/models/countries.entity';
import { Studio } from '../../studios/models/studios.entity';

@Entity({ name: 'movies' })
export class Movie extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  release: number;

  @Column()
  time: number;

  @Column()
  rate: number;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Country, (countries) => countries.movie)
  countries: Country[];

  @OneToMany(() => Studio, (studios) => studios.movie)
  studios: Studio[];

  @OneToMany(() => Tag, (tags) => tags.movie)
  tags: Tag[];

  @OneToMany(() => Crew, (crews) => crews.movie)
  crews: Crew[];
}
