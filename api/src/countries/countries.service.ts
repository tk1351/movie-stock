import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesRepository } from './countries.repository';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesRepository)
    private countriesRepository: CountriesRepository,
  ) {}
}
