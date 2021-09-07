import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchListRepository } from './watch-list.repository';
import { WatchList } from './models/watch-list.entity';
import { IMessage, UserInfo } from '../types/type';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { GetWatchListQueryParamsDto } from './dto/get-watch-list-query-params.dto';

@Injectable()
export class WatchListService {
  constructor(
    @InjectRepository(WatchListRepository)
    private watchListRepository: WatchListRepository,
  ) {}

  async getWatchList(
    params: GetWatchListQueryParamsDto,
    user: UserInfo,
  ): Promise<[WatchList[], number]> {
    return this.watchListRepository.getWatchList(params, user);
  }

  async registerMovie(
    createWatchListDto: CreateWatchListDto,
    user: UserInfo,
  ): Promise<IMessage> {
    return this.watchListRepository.registerMovie(createWatchListDto, user);
  }
}
