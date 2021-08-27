import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/get-user.decorator';
import { UserInfo, StudioRank } from '../types/type';
import { Studio } from './models/studios.entity';
import { GetStudiosQueryParams } from './dto/get-studios-query-params.dto';

@Controller('studios')
export class StudiosController {
  constructor(private studiosService: StudiosService) {}

  @Get()
  @UseGuards(AuthGuard)
  getStudios(@CurrentUser() user: UserInfo): Promise<Studio[]> {
    return this.studiosService.getStudios(user);
  }

  @Get('/rank')
  @UseGuards(AuthGuard)
  getStudiosRank(@CurrentUser() user: UserInfo): Promise<StudioRank[]> {
    return this.studiosService.getStudiosRank(user);
  }

  @Get('/filter')
  @UseGuards(AuthGuard)
  getFilteredStudios(
    @Query() params: GetStudiosQueryParams,
    @CurrentUser() user: UserInfo,
  ): Promise<StudioRank[]> {
    return this.studiosService.getFilteredStudios(params, user);
  }
}
