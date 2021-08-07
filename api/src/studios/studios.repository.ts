import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { Studio } from './models/studios.entity';
import { IMessage, UserInfo, StudioRank } from '../types/type';
import { CreateStudiosDto } from './dto/create-studios.dto';
import { UsersRepository } from '../users/users.repository';

@EntityRepository(Studio)
export class StudiosRepository extends Repository<Studio> {
  async getStudios(user: UserInfo): Promise<Studio[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const studios = await this.createQueryBuilder('studios')
      .leftJoinAndSelect('studios.movie', 'movie')
      .getMany();

    try {
      return studios;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getStudiosRank(user: UserInfo): Promise<StudioRank[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const result = await this.createQueryBuilder('studios')
      .select(['studios.studio', 'COUNT(*) AS cnt'])
      .take(5)
      .groupBy('studios.studio')
      .orderBy('cnt', 'DESC')
      .getRawMany<StudioRank>();

    try {
      return result;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async registerStudio(createStudiosDto: CreateStudiosDto): Promise<Studio> {
    const { studio, movieId } = createStudiosDto;

    const newStudio = this.create();
    newStudio.studio = studio;
    newStudio.movieId = movieId;

    try {
      await newStudio.save();
      return newStudio;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getStudiosByMovieId(movieId: number): Promise<Studio[]> {
    const found = await this.createQueryBuilder('studios')
      .where('studios.movieId = :movieId', { movieId })
      .getMany();

    if (!found)
      throw new NotFoundException(`id: ${movieId}の制作会社は存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteStudio(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}の制作会社は存在しません`);

    try {
      return { message: '制作会社を削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteStudioByMovieId(movieId: number): Promise<IMessage> {
    const targetIndex = await this.getStudiosByMovieId(movieId);

    if (targetIndex.length > 0) {
      targetIndex.map(async (index) => await this.delete({ id: index.id }));
      return { message: '制作会社を削除しました' };
    }
  }
}
