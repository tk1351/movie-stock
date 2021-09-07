import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchList } from './models/watch-list.entity';
import { IMessage, UserInfo } from '../types/type';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { GetWatchListQueryParamsDto } from './dto/get-watch-list-query-params.dto';
import { UpdateWatchListDto } from './dto/update-watch-list.dto';

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

  @Post('/register')
  @UseGuards(AuthGuard)
  registerMovie(
    @Body(ValidationPipe) createWatchListDto: CreateWatchListDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.watchListService.registerMovie(createWatchListDto, user);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard)
  updateWatchList(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) params: UpdateWatchListDto,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.watchListService.updateWatchList(id, params, user);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  deleteWatchList(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserInfo,
  ): Promise<IMessage> {
    return this.watchListService.deleteWatchList(id, user);
  }
}