import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crew } from './models/crews.entity';
import { CrewsRepository } from './crews.repository';
import { GetCrewsQueryParams } from './dto/get-crews-query-params.dto';
import { UserInfo } from '../types/type';

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
}
