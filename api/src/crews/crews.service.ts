import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crew } from './models/crews.entity';
import { CrewsRepository } from './crews.repository';
import { GetCrewsQueryParams } from './dto/get-crews-query-params.dto';
import { UserInfo, IMessage } from '../types/type';
import { CreateCrewDtos } from './dto/create-crew.dtos';

@Injectable()
export class CrewsService {
  constructor(
    @InjectRepository(CrewsRepository)
    private crewsRepository: CrewsRepository,
  ) {}

  async getCrews(params: GetCrewsQueryParams, user: UserInfo): Promise<Crew[]> {
    return await this.crewsRepository.getCrews(params, user);
  }

  async getCrewsLength(
    params: GetCrewsQueryParams,
    user: UserInfo,
  ): Promise<number> {
    return await this.crewsRepository.getCrewsLength(params, user);
  }

  async getCrewsByMovieId(movieId: number): Promise<Crew[]> {
    return await this.crewsRepository.getCrewsByMovieId(movieId);
  }

  async getCrewsRankByCategory(
    category: number,
    user: UserInfo,
  ): Promise<any[]> {
    return await this.crewsRepository.getCrewsRankByCategory(category, user);
  }

  async createCrews(createCrewDtos: CreateCrewDtos[]): Promise<Crew[]> {
    const newCrews = Promise.all(
      createCrewDtos.map(async (createCrewDto) => {
        const newCrew = await this.crewsRepository.registerCrew(createCrewDto);
        return newCrew;
      }),
    );
    return newCrews;
  }

  async deleteCrewByMovieId(movieId: number): Promise<IMessage> {
    return await this.crewsRepository.deleteCrewByMovieId(movieId);
  }
}
