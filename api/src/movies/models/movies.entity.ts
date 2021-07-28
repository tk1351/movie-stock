import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { User } from '../../users/models/users.entity';
import { Tag } from '../../tags/models/tags.entity';
import { Crew } from '../../crews/models/crews.entity';

@Entity({ name: 'movies' })
export class Movie extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  release: string;

  @Column()
  time: string;

  @Column()
  country: string;

  @Column()
  productionCompany: string;

  @ManyToOne(() => User, (user) => user.movies, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Tag, (tags) => tags.movie, { eager: true })
  tags: Tag[];

  @OneToMany(() => Crew, (crews) => crews.movie, { eager: true })
  crews: Crew[];
}
