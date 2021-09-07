import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from 'src/entity';
import { User } from '../../users/models/users.entity';

@Entity({ name: 'watch-list' })
export class WatchList extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  release: number;

  @Column()
  time: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.watchList)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;
}
