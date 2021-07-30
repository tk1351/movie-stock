import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesRepository])],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
