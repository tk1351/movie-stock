import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTagsDto } from '../../tags/dto/create-tags.dto';
import { CreateCrewsDto } from '../../crews/dto/create-crews.dto';
import { CreateCountriesDto } from '../../countries/dto/create-countries.dto';
import { CreateStudiosDto } from '../../studios/dto/create-studios.dto';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @IsNotEmpty({ message: 'releaseを入力してください' })
  release: number;

  @IsNotEmpty({ message: 'timeを入力してください' })
  time: number;

  @IsNotEmpty({ message: 'countriesを入力してください' })
  countries: CreateCountriesDto[];

  @IsNotEmpty({ message: 'studioを入力してください' })
  studios: CreateStudiosDto[];

  @IsNotEmpty({ message: 'crewsを入力してください' })
  crews: CreateCrewsDto[];

  @IsNotEmpty({ message: 'tagsを入力してください' })
  tags: CreateTagsDto[];
}
