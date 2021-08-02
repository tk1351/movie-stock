import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Crew } from './models/crews.entity';
import { CreateCrewsDto } from './dto/create-crews.dto';
import { IMessage, UserInfo } from '../types/type';
import { GetCrewsQueryParams } from './dto/get-crews-query-params.dto';
import { UsersRepository } from '../users/users.repository';

@EntityRepository(Crew)
export class CrewsRepository extends Repository<Crew> {
  async getCrews(params: GetCrewsQueryParams, user: UserInfo): Promise<Crew[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const { name, category, offset, limit } = params;

    const crews = await this.createQueryBuilder('crews')
      .leftJoinAndSelect('crews.movie', 'movie')
      .where(name ? 'crews.name LIKE :name' : 'true', { name: `%${name}%` })
      .andWhere(category ? 'crews.category = :category' : 'true', { category })
      .take(limit)
      .skip(offset)
      .orderBy('movie.release', 'DESC')
      .getMany();

    try {
      return crews;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCrewsLength(
    params: GetCrewsQueryParams,
    user: UserInfo,
  ): Promise<number> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const { name, category, offset, limit } = params;

    const crews = await this.createQueryBuilder('crews')
      .leftJoinAndSelect('crews.movie', 'movie')
      .where(name ? 'crews.name LIKE :name' : 'true', { name: `%${name}%` })
      .andWhere(category ? 'crews.category = :category' : 'true', { category })
      .take(limit)
      .skip(offset)
      .orderBy('movie.release', 'DESC')
      .getMany();

    try {
      return crews.length;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async registerCrew(createCrewsDto: CreateCrewsDto): Promise<Crew> {
    const { category, name, movieId } = createCrewsDto;

    const crew = this.create();
    crew.category = category;
    crew.name = name;
    crew.movieId = movieId;

    try {
      await crew.save();
      return crew;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCrewsByMovieId(movieId: number): Promise<Crew[]> {
    const found = await this.createQueryBuilder('crews')
      .where('crews.movieId = :movieId', { movieId })
      .getMany();

    if (!found)
      throw new NotFoundException(`id: ${movieId}のスタッフは存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteCrew(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}のスタッフは存在しません`);

    try {
      return { message: 'スタッフを削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
