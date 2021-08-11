import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Country } from './models/countries.entity';
import { IMessage, UserInfo, CountryRank } from '../types/type';
import { CreateCountriesDto } from './dto/create-countries.dto';
import { UsersRepository } from '../users/users.repository';

@EntityRepository(Country)
export class CountriesRepository extends Repository<Country> {
  async getCountries(user: UserInfo): Promise<Country[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const countries = await this.createQueryBuilder('countries')
      .leftJoinAndSelect('countries.movie', 'movie')
      .getMany();

    try {
      return countries;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCountriesRank(user: UserInfo): Promise<CountryRank[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne({ sub: user.sub });
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const result = await this.createQueryBuilder('countries')
      .select(['countries.country', 'COUNT(*) AS cnt'])
      .take(50)
      .groupBy('countries.country')
      .orderBy('cnt', 'DESC')
      .getRawMany<CountryRank>();

    try {
      return result;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

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

  async deleteCountryByMovieId(movieId: number): Promise<IMessage> {
    const targetIndex = await this.getCountriesByMovieId(movieId);

    if (targetIndex.length > 0) {
      targetIndex.map(async (index) => await this.delete({ id: index.id }));
      return { message: '国を削除しました' };
    }
  }
}
