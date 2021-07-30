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
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CurrentUser } from '../auth/get-user.decorator';
import { IMessage, UserInfo } from '../types/type';
import { AuthGuard } from '../auth/auth.guard';
import { GetMoviesQueryParams } from './dto/get-movies-query-params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getMovies(
    @Query() params: GetMoviesQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<Movie[]> {
    return this.moviesService.getMovies(params, user);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getMoviesByUser(@CurrentUser() user: UserInfo): Promise<Movie[]> {
    return this.moviesService.getMoviesByUser(user);
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

  @Post('/register')
  @UseGuards(AuthGuard)
  register(
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesService.registerMovie(createMovieDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteMovie(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.moviesService.deleteMovie(id, user);
  }
}
