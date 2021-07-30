import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage, UserInfo } from '../types/type';
import { GetMoviesQueryParams } from './dto/get-movies-query-params.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}

  async getMovies(
    params: GetMoviesQueryParams,
    user: UserInfo,
  ): Promise<Movie[]> {
    return await this.moviesRepository.getMovies(params, user);
  }

  async getMovieById(id: number): Promise<Movie> {
    return await this.moviesRepository.getMovieById(id);
  }

  async getMoviesByUser(user: UserInfo): Promise<Movie[]> {
    return await this.moviesRepository.getMoviesByUser(user);
  }

  async getMovieByUser(id: number, user: UserInfo): Promise<Movie> {
    return await this.moviesRepository.getMovieByUser(id, user);
  }

  async registerMovie(
    createMovieDto: CreateMovieDto,
    user: UserInfo,
  ): Promise<IMessage> {
    return await this.moviesRepository.registerMovie(createMovieDto, user);
  }

  async deleteMovie(id: number, user: UserInfo): Promise<IMessage> {
    return await this.moviesRepository.deleteMovie(id, user);
  }
}
