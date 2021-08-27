import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudiosRepository } from './studios.repository';
import { IMessage, UserInfo, StudioRank } from '../types/type';
import { CreateStudioDtos } from './dto/create-studio.dtos';
import { Studio } from './models/studios.entity';
import { GetStudiosQueryParams } from './dto/get-studios-query-params.dto';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(StudiosRepository)
    private studiosRepository: StudiosRepository,
  ) {}

  async getStudios(user: UserInfo): Promise<Studio[]> {
    return await this.studiosRepository.getStudios(user);
  }

  async getStudiosRank(user: UserInfo): Promise<StudioRank[]> {
    return await this.studiosRepository.getStudiosRank(user);
  }

  async getFilteredStudios(
    params: GetStudiosQueryParams,
    user: UserInfo,
  ): Promise<StudioRank[]> {
    return await this.studiosRepository.getFilteredStudios(params, user);
  }

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
