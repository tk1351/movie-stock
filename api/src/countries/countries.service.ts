import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesRepository } from './countries.repository';
import { IMessage, UserInfo } from '../types/type';
import { CreateCountryDtos } from './dto/create-country.dtos';
import { Country } from './models/countries.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesRepository)
    private countriesRepository: CountriesRepository,
  ) {}

  async getCountries(user: UserInfo): Promise<Country[]> {
    return await this.countriesRepository.getCountries(user);
  }

  async getCountriesRank(user: UserInfo): Promise<any[]> {
    return await this.countriesRepository.getCountriesRank(user);
  }

  async createCountries(
    createCountryDtos: CreateCountryDtos[],
  ): Promise<Country[]> {
    const newCountries = Promise.all(
      createCountryDtos.map(async (createCountryDto) => {
        const newCountry = await this.countriesRepository.registerCountry(
          createCountryDto,
        );
        return newCountry;
      }),
    );
    return newCountries;
  }

  async deleteCountryByMovieId(movieId: number): Promise<IMessage> {
    return await this.countriesRepository.deleteCountryByMovieId(movieId);
  }
}
