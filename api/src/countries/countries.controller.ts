import { Controller, Get, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { UserInfo, CountryRank } from '../types/type';
import { Country } from './models/countries.entity';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCountries(@CurrentUser() user: UserInfo): Promise<Country[]> {
    return this.countriesService.getCountries(user);
  }

  @Get('/rank')
  @UseGuards(AuthGuard)
  getCountriesRank(@CurrentUser() user: UserInfo): Promise<CountryRank[]> {
    return this.countriesService.getCountriesRank(user);
  }
}
