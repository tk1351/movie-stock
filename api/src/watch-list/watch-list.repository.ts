import { EntityRepository, Repository } from 'typeorm';
import { WatchList } from './models/watch-list.entity';

@EntityRepository(WatchList)
export class WatchListRepository extends Repository<WatchList> {}
