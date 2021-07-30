import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { UsersModule } from '../users/users.module';
import { CrewsModule } from '../crews/crews.module';
import { TagsModule } from '../tags/tags.module';
import { CountriesModule } from '../countries/countries.module';
import { StudiosModule } from '../studios/studios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesRepository]),
    UsersModule,
    CrewsModule,
    TagsModule,
    CountriesModule,
    StudiosModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
