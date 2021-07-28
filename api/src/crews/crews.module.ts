import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrewsService } from './crews.service';
import { CrewsController } from './crews.controller';
import { CrewsRepository } from './crews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CrewsRepository])],
  providers: [CrewsService],
  controllers: [CrewsController],
  exports: [CrewsService],
})
export class CrewsModule {}
