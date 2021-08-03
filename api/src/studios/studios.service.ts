import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudiosRepository } from './studios.repository';
import { IMessage } from '../types/type';
import { CreateStudioDtos } from './dto/create-studio.dtos';
import { Studio } from './models/studios.entity';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(StudiosRepository)
    private studiosRepository: StudiosRepository,
  ) {}

  async createStudios(createStudioDtos: CreateStudioDtos[]): Promise<Studio[]> {
    const newStudios = Promise.all(
      createStudioDtos.map(async (createStudioDto) => {
        const newStudio = await this.studiosRepository.registerStudio(
          createStudioDto,
        );
        return newStudio;
      }),
    );
    return newStudios;
  }

  async deleteStudioByMovieId(movieId: number): Promise<IMessage> {
    return this.studiosRepository.deleteStudioByMovieId(movieId);
  }
}
