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
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { User } from '../users/models/users.entity';
import { CurrentUser } from '../auth/get-user.decorator';
import { IMessage } from '../types/type';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getMovies(): Promise<Movie[]> {
    return this.moviesService.getMovies();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getMovieByUser(@CurrentUser() user: User): Promise<Movie[]> {
    return this.moviesService.getMovieByUser(user);
  }

  @Get('/:id')
  getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post('/register')
  @UseGuards(AuthGuard)
  register(
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    @CurrentUser() user: User,
  ): Promise<IMessage> {
    return this.moviesService.registerMovie(createMovieDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteMovie(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<IMessage> {
    return this.moviesService.deleteMovie(id, user);
  }
}
