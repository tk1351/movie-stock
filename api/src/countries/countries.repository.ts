import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Country } from './models/countries.entity';
import { IMessage } from '../types/type';
import { CreateCountriesDto } from './dto/create-countries.dto';

@EntityRepository(Country)
export class CountriesRepository extends Repository<Country> {
  async registerCountry(
    createCountriesDto: CreateCountriesDto,
  ): Promise<Country> {
    const { country, movieId } = createCountriesDto;

    const newCountry = this.create();
    newCountry.country = country;
    newCountry.movieId = movieId;

    try {
      await newCountry.save();
      return newCountry;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCountriesByMovieId(movieId: number): Promise<Country[]> {
    const found = await this.createQueryBuilder('countries')
      .where('countries.movieId = :movieId', { movieId })
      .getMany();

    if (!found) throw new NotFoundException(`id: ${movieId}の国は存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteCountry(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}の国は存在しません`);

    try {
      return { message: '国を削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
