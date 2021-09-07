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

  async registerMovie(
    createWatchListDto: CreateWatchListDto,
    user: UserInfo,
  ): Promise<IMessage> {
    return this.watchListRepository.registerMovie(createWatchListDto, user);
  }

  async updateWatchList(
    id: number,
    params: UpdateWatchListDto,
    user: UserInfo,
  ): Promise<IMessage> {
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
      return { message: '観たい映画の更新が完了しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteWatchList(id: number, user: UserInfo): Promise<IMessage> {
    return this.watchListRepository.deleteWatchList(id, user);
  }
}
