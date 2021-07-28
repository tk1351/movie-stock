import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Crew } from './models/crews.entity';
import { CreateCrewsDto } from './dto/create-crews.dto';

@EntityRepository(Crew)
export class CrewsRepository extends Repository<Crew> {
  async registerCrew(createCrewsDto: CreateCrewsDto): Promise<Crew> {
    const { category, name, movieId } = createCrewsDto;

    const crew = this.create();
    crew.category = category;
    crew.name = name;
    crew.movieId = movieId;

    try {
      await crew.save();
      return crew;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
