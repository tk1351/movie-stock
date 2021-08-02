import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesRepository } from './countries.repository';
import { IMessage } from '../types/type';
import { CreateCountryDtos } from './dto/create-country.dtos';
import { Country } from './models/countries.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesRepository)
    private countriesRepository: CountriesRepository,
  ) {}

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
