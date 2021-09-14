import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage, UserInfo } from '../types/type';
import { GetMoviesQueryParams } from './dto/get-movies-query-params.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UsersService } from '../users/users.service';
import { CountriesService } from '../countries/countries.service';
import { StudiosService } from '../studios/studios.service';
import { CrewsService } from '../crews/crews.service';
import { TagsService } from '../tags/tags.service';
import { CreateCrewDtos } from '../crews/dto/create-crew.dtos';
import { CreateCountryDtos } from '../countries/dto/create-country.dtos';
import { CreateStudioDtos } from '../studios/dto/create-studio.dtos';
import { CreateTagDtos } from '../tags/dto/create-tag.dtos';
import { GetMoviesByDecadeQueryParams } from './dto/get-movies-by-decade-query-params.dto';
import { GetMoviesMoreThanLessThanTimeQueryParams } from './dto/get-movies-more-than-less-than-time-query-params.dto';
import { CreateLandingMovieDto } from './dto/create-landing-moviee.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
    private usersService: UsersService,
    private countriesService: CountriesService,
    private studiosService: StudiosService,
    private crewsService: CrewsService,
    private tagsService: TagsService,
  ) {}

  async getMovies(
    params: GetMoviesQueryParams,
    user: UserInfo,
  ): Promise<[Movie[], number]> {
    return await this.moviesRepository.getMovies(params, user);
  }

  async getMovieById(id: number): Promise<Movie> {
    return await this.moviesRepository.getMovieById(id);
  }

  async getMovieByUser(id: number, user: UserInfo): Promise<Movie> {
    return await this.moviesRepository.getMovieByUser(id, user);
  }

  async getMoviesByDecade(
    year: number,
    getMoviesByDecadeQueryParams: GetMoviesByDecadeQueryParams,
    user: UserInfo,
  ): Promise<[Movie[], number]> {
    return await this.moviesRepository.getMoviesByDecade(
      year,
      getMoviesByDecadeQueryParams,
      user,
    );
  }

  async getMoviesMoreThanLessThanTime(
    getMoviesMoreThanLessThanTimeQueryParams: GetMoviesMoreThanLessThanTimeQueryParams,
    user: UserInfo,
  ): Promise<[Movie[], number]> {
    return await this.moviesRepository.getMoviesMoreThanLessThanTime(
      getMoviesMoreThanLessThanTimeQueryParams,
      user,
    );
  }

  async getLandingMovies(): Promise<Movie[]> {
    return await this.moviesRepository.getLandingMovies();
  }

  async registerLandingMovie(
    createLandingMovieDto: CreateLandingMovieDto,
    user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesRepository.registerLandingMovie(
      createLandingMovieDto,
      user,
    );
  }

  async registerMovie(
    createMovieDto: CreateMovieDto,
    user: UserInfo,
  ): Promise<IMessage> {
    return await this.moviesRepository.registerMovie(createMovieDto, user);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
    user: UserInfo,
  ): Promise<IMessage> {
    const foundUser = await this.usersService.getUser(user);
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const movie = await this.getMovieById(id);
    if (!movie) throw new NotFoundException(`id: ${id}の映画は存在しません`);

    if (movie.userId !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    const { title, release, time, rate, countries, studios, crews, tags } =
      updateMovieDto;

    (movie.title = title), (movie.release = release);
    movie.time = time;
    movie.rate = rate;

    await this.countriesService.deleteCountryByMovieId(id);

    const createCountryDtos: CreateCountryDtos[] = countries.map((country) => {
      return { ...country, movieId: id };
    });

    const newCountries = await this.countriesService.createCountries(
      createCountryDtos,
    );
    movie.countries = newCountries;

    await this.studiosService.deleteStudioByMovieId(id);

    const createStudioDtos: CreateStudioDtos[] = studios.map((studio) => {
      return { ...studio, movieId: id };
    });

    const newStudios = await this.studiosService.createStudios(
      createStudioDtos,
    );
    movie.studios = newStudios;

    await this.crewsService.deleteCrewByMovieId(id);

    const createCrewDtos: CreateCrewDtos[] = crews.map((crew) => {
      return { ...crew, movieId: id };
    });

    const newCrews = await this.crewsService.createCrews(createCrewDtos);
    movie.crews = newCrews;

    await this.tagsService.deleteTagByMovieId(id);

    const createTagDtos: CreateTagDtos[] = tags.map((tag) => {
      return { ...tag, movieId: id };
    });

    const newTags = await this.tagsService.createTags(createTagDtos);
    movie.tags = newTags;

    await this.moviesRepository.save(movie);
    return { message: '映画の更新が完了しました' };
  }

  async deleteMovie(id: number, user: UserInfo): Promise<IMessage> {
    return await this.moviesRepository.deleteMovie(id, user);
  }
}
