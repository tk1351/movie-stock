import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crew } from './models/crews.entity';
import { CrewsRepository } from './crews.repository';

@Injectable()
export class CrewsService {
  constructor(
    @InjectRepository(CrewsRepository)
    private crewsRepository: CrewsRepository,
  ) {}

  async getCrews(): Promise<Crew[]> {
    return this.crewsRepository.find();
  }

  async getCrewsByMovieId(movieId: number): Promise<Crew[]> {
    return await this.crewsRepository.getCrewsByMovieId(movieId);
  }
}
