import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchList } from './models/watch-list.entity';
import { IMessage, UserInfo } from '../types/type';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { GetWatchListQueryParamsDto } from './dto/get-watch-list-query-params.dto';

@Controller('watch-list')
export class WatchListController {
  constructor(private watchListService: WatchListService) {}

  @Get()
  @UseGuards(AuthGuard)
  getWatchList(
    @Query(ValidationPipe) params: GetWatchListQueryParamsDto,
    @CurrentUser() user: UserInfo,
  ): Promise<[WatchList[], number]> {
    return this.watchListService.getWatchList(params, user);
  }

  @Post()
  @UseGuards(AuthGuard)
  registerMovie(
    @Body(ValidationPipe) createWatchListDto: CreateWatchListDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.watchListService.registerMovie(createWatchListDto, user);
  }
}
