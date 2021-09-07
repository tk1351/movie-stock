import { Controller, Get } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchList } from './models/watch-list.entity';

@Controller('watch-list')
export class WatchListController {
  constructor(private watchListService: WatchListService) {}

  @Get()
  getWatchList(): Promise<WatchList[]> {
    return this.watchListService.getWatchList();
  }
}
