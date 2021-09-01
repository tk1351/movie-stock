import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage, UserInfo } from '../types/type';
import { UsersRepository } from '../users/users.repository';
import { CrewsRepository } from '../crews/crews.repository';
import { TagsRepository } from '../tags/tags.repository';
import { GetMoviesQueryParams } from './dto/get-movies-query-params.dto';
import { CountriesRepository } from '../countries/countries.repository';
import { StudiosRepository } from '../studios/studios.repository';
import { GetMoviesByDecadeQueryParams } from './dto/get-movies-by-decade-query-params.dto';
import { GetMoviesMoreThanLessThanTimeQueryParams } from './dto/get-movies-more-than-less-than-time-query-params.dto';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovies(
    params: GetMoviesQueryParams,
    user: UserInfo,
  ): Promise<[Movie[], number]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const { title, release, time, country, studio, name, tag, offset, limit } =
      params;

    const movies = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.countries', 'countries')
      .leftJoinAndSelect('movies.studios', 'studios')
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
      .where('movies.userId = :userId', { userId: foundUser.id })
      .andWhere(title ? 'movies.title LIKE :title' : 'true', {
        title: `%${title}%`,
      })
      .andWhere(release ? 'movies.release = :release' : 'true', { release })
      .andWhere(time ? 'movies.time = :time' : 'true', { time })
      .andWhere(
        country
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('countries.movieId')
                .from('countries', 'countries')
                .where('countries.country = :country', { country })
                .getQuery()
          : 'true',
      )
      .andWhere(
        studio
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('studios.movieId')
                .from('studios', 'studios')
                .where('studios.studio = :studio', { studio })
                .getQuery()
          : 'true',
      )
      // moviesに紐づくcrewsを全取得
      .andWhere(
        name
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('crews.movieId')
                .from('crews', 'crews')
                .where('crews.name LIKE :name', {
                  name: `%${name}%`,
                })
                .getQuery()
          : 'true',
      )
      // moviesに紐づくtagsを全取得
      .andWhere(
        tag
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('tags.movieId')
                .from('tags', 'tags')
                .where('tags.text = :tag', { tag })
                .getQuery()
          : 'true',
      )
      .take(limit)
      .skip(offset)
      .orderBy('movies.id', 'DESC')
      .getManyAndCount();

    try {
      return movies;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMoviesLength(
    params: GetMoviesQueryParams,
    user: UserInfo,
  ): Promise<number> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const { title, release, time, country, studio, name, tag } = params;

    const result = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.countries', 'countries')
      .leftJoinAndSelect('movies.studios', 'studios')
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
      .where('movies.userId = :userId', { userId: foundUser.id })
      .andWhere(title ? 'movies.title LIKE :title' : 'true', {
        title: `%${title}%`,
      })
      .andWhere(release ? 'movies.release = :release' : 'true', { release })
      .andWhere(time ? 'movies.time = :time' : 'true', { time })
      .andWhere(
        country
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('countries.movieId')
                .from('countries', 'countries')
                .where('countries.country = :country', { country })
                .getQuery()
          : 'true',
      )
      .andWhere(
        studio
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('studios.movieId')
                .from('studios', 'studios')
                .where('studios.studio = :studio', { studio })
                .getQuery()
          : 'true',
      )
      // moviesに紐づくcrewsを全取得
      .andWhere(
        name
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('crews.movieId')
                .from('crews', 'crews')
                .where('crews.name LIKE :name', {
                  name: `%${name}%`,
                })
                .getQuery()
          : 'true',
      )
      // moviesに紐づくtagsを全取得
      .andWhere(
        tag
          ? (qb) =>
              'movies.id IN' +
              qb
                .subQuery()
                .select('tags.movieId')
                .from('tags', 'tags')
                .where('tags.text = :tag', { tag })
                .getQuery()
          : 'true',
      )
      .orderBy('movies.createdAt', 'DESC')
      .getCount();

    try {
      return result;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMovieById(id: number): Promise<Movie> {
    const found = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.countries', 'countries')
      .leftJoinAndSelect('movies.studios', 'studios')
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
      .where('movies.id = :id', { id })
      .getOne();

    if (!found) throw new NotFoundException(`id: ${id}の映画は存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMovieByUser(id: number, user: UserInfo): Promise<Movie> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const movie = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.countries', 'countries')
      .leftJoinAndSelect('movies.studios', 'studios')
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
      .where('movies.id = :id', { id })
      .orderBy({
        'countries.id': 'ASC',
        'studios.id': 'ASC',
        'crews.category': 'ASC',
        'tags.id': 'ASC',
      })
      .getOne();

    if (!movie) throw new NotFoundException(`id: ${id}の映画は存在しません`);

    if (movie.userId !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    try {
      return movie;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMoviesByDecade(
    release: number,
    getMoviesByDecadeQueryParams: GetMoviesByDecadeQueryParams,
    user: UserInfo,
  ): Promise<[Movie[], number]> {
    const { offset, limit } = getMoviesByDecadeQueryParams;

    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const result = release + 9;

    const movies = await this.createQueryBuilder('movies')
      .where('movies.userId = :userId', { userId: foundUser.id })
      .andWhere('movies.release BETWEEN :release AND :result', {
        release,
        result,
      })
      .take(limit)
      .skip(offset)
      .orderBy('movies.id', 'DESC')
      .getManyAndCount();

    return movies;
  }

  async getMoviesMoreThanLessThanTime(
    getMoviesMoreThanLessThanTimeQueryParams: GetMoviesMoreThanLessThanTimeQueryParams,
    user: UserInfo,
  ): Promise<[Movie[], number]> {
    const { begin, end, offset, limit } =
      getMoviesMoreThanLessThanTimeQueryParams;

    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const movies = await this.createQueryBuilder('movies')
      .where('movies.userId = :userId', { userId: foundUser.id })
      .andWhere('movies.time BETWEEN :begin AND :end', {
        begin,
        end,
      })
      .take(limit)
      .skip(offset)
      .orderBy('movies.id', 'DESC')
      .getManyAndCount();

    return movies;
  }

  async registerMovie(
    createMovieDto: CreateMovieDto,
    user: UserInfo,
  ): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);
    const countriesRepository = getCustomRepository(CountriesRepository);
    const studiosRepository = getCustomRepository(StudiosRepository);
    const crewsRepository = getCustomRepository(CrewsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (foundUser.role === undefined)
      throw new UnauthorizedException('権限がありません');

    const { title, release, time, countries, studios, crews, tags } =
      createMovieDto;

    const movie = this.create();
    movie.title = title;
    movie.release = release;
    movie.time = time;
    movie.user = foundUser;

    const newMovie = await movie.save();

    countries.map((country) =>
      countriesRepository.registerCountry({
        country: country.country,
        movieId: newMovie.id,
      }),
    );

    studios.map((studio) =>
      studiosRepository.registerStudio({
        studio: studio.studio,
        movieId: newMovie.id,
      }),
    );

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

  async deleteMovie(id: number, user: UserInfo): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);

    const movie = await this.getMovieById(id);
    const foundUser = await usersRepository.findOne({ sub: user.sub });

    if (movie.userId !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    movie.countries = [];
    movie.studios = [];
    movie.crews = [];
    movie.tags = [];

    await this.save(movie);

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
