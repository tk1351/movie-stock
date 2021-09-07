import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchListRepository } from './watch-list.repository';
import { WatchList } from './models/watch-list.entity';

@Injectable()
export class WatchListService {
  constructor(
    @InjectRepository(WatchListRepository)
    private watchListRepository: WatchListRepository,
  ) {}

  async getWatchList(): Promise<WatchList[]> {
    return this.watchListRepository.find({});
  }
}
