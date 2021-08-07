import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/get-user.decorator';
import { UserInfo, StudioRank } from '../types/type';
import { Studio } from './models/studios.entity';

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
}
