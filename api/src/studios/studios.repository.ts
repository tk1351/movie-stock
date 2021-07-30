import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Studio } from './models/studios.entity';
import { IMessage } from '../types/type';
import { CreateStudiosDto } from './dto/create-studios.dto';

@EntityRepository(Studio)
export class StudiosRepository extends Repository<Studio> {
  async registerStudio(createStudiosDto: CreateStudiosDto): Promise<Studio> {
    const { studio, movieId } = createStudiosDto;

    const newStudio = this.create();
    newStudio.studio = studio;
    newStudio.movieId = movieId;

    try {
      await newStudio.save();
      return newStudio;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getStudiosByMovieId(movieId: number): Promise<Studio[]> {
    const found = await this.createQueryBuilder('studios')
      .where('studios.movieId = :movieId', { movieId })
      .getMany();

    if (!found)
      throw new NotFoundException(`id: ${movieId}の制作会社は存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteStudio(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}の制作会社は存在しません`);

    try {
      return { message: '制作会社を削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
