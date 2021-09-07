import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { WatchList } from './models/watch-list.entity';
import { IMessage, UserInfo } from '../types/type';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { UsersRepository } from '../users/users.repository';
import { GetWatchListQueryParamsDto } from './dto/get-watch-list-query-params.dto';

@EntityRepository(WatchList)
export class WatchListRepository extends Repository<WatchList> {
  async getWatchList(
    params: GetWatchListQueryParamsDto,
    user: UserInfo,
  ): Promise<[WatchList[], number]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (foundUser.role === undefined)
      throw new UnauthorizedException('権限がありません');

    const { title, director, offset, limit } = params;

    const watchList = this.createQueryBuilder('watch-list')
      .where('watch-list.userId = :userId', { userId: foundUser.id })
      .andWhere(title ? 'watch-list.title LIKE :title' : 'true', {
        title: `%${title}%`,
      })
      .andWhere(director ? 'watch-list.director LIKE :director' : 'true', {
        director: `%${director}%`,
      })
      .take(limit)
      .skip(offset)
      .orderBy('watch-list.id', 'DESC')
      .getManyAndCount();

    try {
      return watchList;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async registerMovie(
    createWatchListDto: CreateWatchListDto,
    user: UserInfo,
  ): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (foundUser.role === undefined)
      throw new UnauthorizedException('権限がありません');

    const { title, director, release, time, url } = createWatchListDto;

    const wantWatched = this.create();
    wantWatched.title = title;
    wantWatched.director = director;
    wantWatched.release = release;
    wantWatched.time = time;
    wantWatched.url = url;
    wantWatched.user = foundUser;

    await wantWatched.save();

    try {
      return { message: '観たい映画を登録しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteWatchList(id: number, user: UserInfo): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (foundUser.role === undefined)
      throw new UnauthorizedException('権限がありません');

    await this.findOne({ id });

    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}のwatchListは存在しません`);

    try {
      return { message: '観たい映画を削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
