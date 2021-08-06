import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CrewsService } from './crews.service';
import { Crew } from './models/crews.entity';
import { GetCrewsQueryParams } from './dto/get-crews-query-params.dto';
import { CurrentUser } from '../auth/get-user.decorator';
import { UserInfo } from '../types/type';
import { AuthGuard } from '../auth/auth.guard';

@Controller('crews')
export class CrewsController {
  constructor(private crewsService: CrewsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCrews(
    @Query() params: GetCrewsQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<Crew[]> {
    return this.crewsService.getCrews(params, user);
  }

  @Get('/length')
  @UseGuards(AuthGuard)
  getCrewsLength(
    @Query() params: GetCrewsQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<number> {
    return this.crewsService.getCrewsLength(params, user);
  }

  @Get('/movie/:movieId')
  getCrewsByMovieId(
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<Crew[]> {
    return this.crewsService.getCrewsByMovieId(movieId);
  }

  @Get('/rank/:category')
  @UseGuards(AuthGuard)
  getCrewsRankByCategory(
    @Param('category', ParseIntPipe) category: number,
    @CurrentUser() user: UserInfo,
  ): Promise<any[]> {
    return this.crewsService.getCrewsRankByCategory(category, user);
  }
}
