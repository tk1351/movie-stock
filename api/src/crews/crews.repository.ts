import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Crew } from './models/crews.entity';
import { CreateCrewsDto } from './dto/create-crews.dto';
import { IMessage, UserInfo, CrewRank, CrewFilter } from '../types/type';
import { GetCrewsQueryParams } from './dto/get-crews-query-params.dto';
import { UsersRepository } from '../users/users.repository';

@EntityRepository(Crew)
export class CrewsRepository extends Repository<Crew> {
  async getCrews(params: GetCrewsQueryParams, user: UserInfo): Promise<Crew[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const { name, category, offset, limit } = params;

    const crews = this.createQueryBuilder('crews')
      .leftJoinAndSelect('crews.movie', 'movie')
      .where(name ? 'crews.name LIKE :name' : 'true', { name: `%${name}%` })
      .andWhere(category ? 'crews.category = :category' : 'true', { category })
      .distinctOn(['crews.movieId']);

    // const crews = createQueryBuilder()
    //   .select('*')
    //   .from<Crew>((qb) => {
    //     const subQuery = qb
    //       .subQuery()
    //       .select('*')
    //       .distinctOn([`"movieId"`])
    //       .from(Crew, 'crews')
    //       .leftJoin('crews.movie', 'movie')
    //       .where(name ? 'crews.name LIKE :name' : 'true', {
    //         name: `%${name}%`,
    //       })
    //       .andWhere(category ? 'crews.category = :category' : 'true', {
    //         category,
    //       });
    //     return subQuery;
    //   }, 'crews');

    // const result = await crews.orderBy(`"movieId"`, 'DESC').getRawMany();

    const result = await crews
      .orderBy('crews.movieId')
      .take(limit)
      .skip(offset)
      .getMany();

    // select * from (select distinct on ("movieId") * from crews where crews.name = '黒沢清') as hoge left join movies on "movieId" = movies.id order by release desc

    try {
      return result;
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

    const { name, category } = params;

    const result = await this.createQueryBuilder('crews')
      .where(name ? 'crews.name LIKE :name' : 'true', { name: `%${name}%` })
      .andWhere(category ? 'crews.category = :category' : 'true', { category })
      .getCount();

    // select count(*) from (select distinct on ("movieId") * from crews where crews.name = '黒沢清') as hoge;

    try {
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getFilteredCrews(
    params: GetCrewsQueryParams,
    user: UserInfo,
  ): Promise<CrewFilter[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const { name, limit } = params;

    const crews = await this.createQueryBuilder('crews')
      .select(['crews.name', 'COUNT(*) AS cnt'])
      .where(name ? 'crews.name LIKE :name' : 'true', { name: `%${name}%` })
      .take(limit)
      .groupBy('crews.name')
      .orderBy('cnt', 'DESC')
      .getRawMany<CrewFilter>();

    try {
      return crews;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCrewsRankByCategory(
    category: number,
    user: UserInfo,
  ): Promise<CrewRank[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const result = await this.createQueryBuilder('crews')
      .leftJoinAndSelect('crews.movie', 'movie')
      .where('movie.userId = :userId', { userId: foundUser.id })
      .select('crews.category')
      .addSelect(['crews.name', 'COUNT(*) AS cnt'])
      .where('crews.category = :category', { category })
      .take(50)
      .groupBy('crews.name')
      .addGroupBy('crews.category')
      .orderBy('cnt', 'DESC')
      .getRawMany<CrewRank>();

    try {
      return result;
    } catch (e) {
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

  async deleteCrewByMovieId(movieId: number): Promise<IMessage> {
    const targetIndex = await this.getCrewsByMovieId(movieId);

    if (targetIndex.length > 0) {
      targetIndex.map(async (index) => await this.delete({ id: index.id }));
      return { message: 'スタッフを削除しました' };
    }
  }
}
