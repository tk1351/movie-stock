import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchListRepository } from './watch-list.repository';
import { WatchList } from './models/watch-list.entity';
import { IMessage, UserInfo } from '../types/type';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { GetWatchListQueryParamsDto } from './dto/get-watch-list-query-params.dto';
import { UpdateWatchListDto } from './dto/update-watch-list.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class WatchListService {
  constructor(
    @InjectRepository(WatchListRepository)
    private watchListRepository: WatchListRepository,
    private usersService: UsersService,
  ) {}

  async getWatchList(
    params: GetWatchListQueryParamsDto,
    user: UserInfo,
  ): Promise<[WatchList[], number]> {
    return this.watchListRepository.getWatchList(params, user);
  }

  async getWatchListById(id: number, user: UserInfo): Promise<WatchList> {
    return this.watchListRepository.getWatchListById(id, user);
  }

  async getLandingWatchList(): Promise<WatchList[]> {
    return this.watchListRepository.getLandingWatchList();
  }

  async registerLandingWatchList(
    createWatchListDto: CreateWatchListDto,
    user: UserInfo,
  ): Promise<[IMessage, WatchList]> {
    return this.watchListRepository.registerLandingWatchList(
      createWatchListDto,
      user,
    );
  }

  async registerUsersWatchList(
    createWatchListDto: CreateWatchListDto,
    user: UserInfo,
  ): Promise<[IMessage, WatchList]> {
    return this.watchListRepository.registerUsersWatchList(
      createWatchListDto,
      user,
    );
  }

  async updateWatchList(
    id: number,
    params: UpdateWatchListDto,
    user: UserInfo,
  ): Promise<[IMessage, WatchList]> {
    const foundUser = await this.usersService.getUser(user);
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const watchList = await this.watchListRepository.findOne({ id });

    const { title, director, url, release, time } = params;
    watchList.title = title;
    watchList.director = director;
    watchList.url = url;
    watchList.release = release;
    watchList.time = time;

    await this.watchListRepository.save(watchList);

    try {
      return [{ message: '観たい映画の更新が完了しました' }, watchList];
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteWatchList(id: number, user: UserInfo): Promise<IMessage> {
    return this.watchListRepository.deleteWatchList(id, user);
  }
}
