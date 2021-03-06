import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CurrentUser } from '../auth/get-user.decorator';
import { IMessage, UserInfo } from '../types/type';
import { AuthGuard } from '../auth/auth.guard';
import { GetMoviesQueryParams } from './dto/get-movies-query-params.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetMoviesByDecadeQueryParams } from './dto/get-movies-by-decade-query-params.dto';
import { GetMoviesMoreThanLessThanTimeQueryParams } from './dto/get-movies-more-than-less-than-time-query-params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getMovies(
    @Query(ValidationPipe) params: GetMoviesQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<[Movie[], number]> {
    return this.moviesService.getMovies(params, user);
  }

  @Get('/time')
  @UseGuards(AuthGuard)
  getMoviesMoreThanLessThanTime(
    @Query(ValidationPipe)
    getMoviesMoreThanLessThanTimeQueryParams: GetMoviesMoreThanLessThanTimeQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<[Movie[], number]> {
    return this.moviesService.getMoviesMoreThanLessThanTime(
      getMoviesMoreThanLessThanTimeQueryParams,
      user,
    );
  }

  @Get('/landing')
  getLandingMovies(): Promise<Movie[]> {
    return this.moviesService.getLandingMovies();
  }

  @Get('/:id')
  getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Get('/me/:id')
  @UseGuards(AuthGuard)
  getMovieByUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserInfo,
  ): Promise<Movie> {
    return this.moviesService.getMovieByUser(id, user);
  }

  @Get('/release/decade/:release')
  @UseGuards(AuthGuard)
  getMoviesByDecade(
    @Param('release', ParseIntPipe) year: number,
    @Query(ValidationPipe)
    getMoviesByDecadeQueryParams: GetMoviesByDecadeQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<[Movie[], number]> {
    return this.moviesService.getMoviesByDecade(
      year,
      getMoviesByDecadeQueryParams,
      user,
    );
  }

  @Post('/register')
  @UseGuards(AuthGuard)
  register(
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesService.registerUsersMovie(createMovieDto, user);
  }

  @Post('/register/landing')
  @UseGuards(AuthGuard)
  registerLandingMovie(
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesService.registerLandingMovie(createMovieDto, user);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard)
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesService.updateMovie(id, updateMovieDto, user);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  deleteMovie(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesService.deleteMovie(id, user);
  }
}
