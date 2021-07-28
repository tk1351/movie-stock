import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { User } from '../users/models/users.entity';
import { IMessage } from '../types/type';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}

  async getMovies(): Promise<Movie[]> {
    return await this.moviesRepository.find();
  }

  async getMovieById(id: number): Promise<Movie> {
    return await this.moviesRepository.getMovieById(id);
  }

  async getMovieByUser(user: User): Promise<Movie[]> {
    return await this.moviesRepository.getMovieByUser(user);
  }

  async registerMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<IMessage> {
    return await this.moviesRepository.registerMovie(createMovieDto, user);
  }

  async deleteMovie(id: number, user: User): Promise<IMessage> {
    return await this.moviesRepository.deleteMovie(id, user);
  }
}
