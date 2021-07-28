import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { User } from '../../users/models/users.entity';

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
}
