import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Crew } from './models/crews.entity';
import { CreateCrewsDto } from './dto/create-crews.dto';
import { IMessage } from '../types/type';

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

  async getCrewsByMovieId(movieId: number): Promise<Crew[]> {
    const found = await this.createQueryBuilder('crews')
      .where('crews.movieId = :movieId', { movieId })
      .getMany();

    if (!found)
      throw new NotFoundException(`id: ${movieId}のスタッフは存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteCrew(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}のスタッフは存在しません`);

    try {
      return { message: 'スタッフを削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
