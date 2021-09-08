import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';
import { WatchListRepository } from './watch-list.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([WatchListRepository]), UsersModule],
  providers: [WatchListService],
  controllers: [WatchListController],
})
export class WatchListModule {}
