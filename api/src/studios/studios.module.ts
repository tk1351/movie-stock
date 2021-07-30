import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { StudiosRepository } from './studios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosRepository])],
  providers: [StudiosService],
  controllers: [StudiosController],
  exports: [StudiosService],
})
export class StudiosModule {}
