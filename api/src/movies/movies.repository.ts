import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage } from '../types/type';
import { User } from '../users/models/users.entity';
import { UsersRepository } from '../users/users.repository';
import { CrewsRepository } from '../crews/crews.repository';
import { TagsRepository } from '../tags/tags.repository';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovieById(id: number): Promise<Movie> {
    const found = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .where('movies.id = :id', { id })
      .getOne();

    if (!found) throw new NotFoundException(`id: ${id}の映画は存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMovieByUser(user: User): Promise<Movie[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne(user.id);
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const found = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
      .where('movies.userId = :userId', { userId: user.id })
      .orderBy('movies.createdAt', 'DESC')
      .getMany();

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async registerMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);
    const crewsRepository = getCustomRepository(CrewsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    const foundUser = await usersRepository.findOne(user.id);
    if (foundUser.role === undefined)
      throw new UnauthorizedException('権限がありません');

    const { title, release, time, country, productionCompany, crews, tags } =
      createMovieDto;

    const movie = this.create();
    movie.title = title;
    movie.release = release;
    movie.time = time;
    movie.country = country;
    movie.productionCompany = productionCompany;
    movie.user = foundUser;

    const newMovie = await movie.save();

    crews.map((crew) =>
      crewsRepository.registerCrew({
        category: crew.category,
        name: crew.name,
        movieId: newMovie.id,
      }),
    );

    tags.map((tag) =>
      tagsRepository.registerTag({
        text: tag.text,
        movieId: newMovie.id,
      }),
    );

    try {
      return { message: '映画の登録が完了しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMovie(id: number, user: User): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);
    const crewsRepository = getCustomRepository(CrewsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    const movie = await this.getMovieById(id);
    const foundUser = await usersRepository.findOne(user.id);

    if (movie.userId !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    const crewsIndex = await crewsRepository.getCrewsByMovieId(id);
    const tagsIndex = await tagsRepository.getTagsByMovieId(id);

    crewsIndex.map((index) => crewsRepository.deleteCrew(index.id));
    tagsIndex.map((index) => tagsRepository.deleteTag(index.id));

    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}の映画は存在しません`);

    try {
      return { message: '映画を削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
