import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CrewsService } from './crews.service';
import { Crew } from './models/crews.entity';

@Controller('crews')
export class CrewsController {
  constructor(private crewsService: CrewsService) {}

  @Get()
  getCrews(): Promise<Crew[]> {
    return this.crewsService.getCrews();
  }

  @Get('/movie/:movieId')
  getCrewsByMovieId(
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<Crew[]> {
    return this.crewsService.getCrewsByMovieId(movieId);
  }
}
