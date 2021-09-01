import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { UpdateCountriesDto } from '../../countries/dto/update-countries.dto';
import { UpdateStudiosDto } from '../../studios/dto/update-studios.dto';
import { UpdateCrewsDto } from '../../crews/dto/update-crews.dto';
import { UpdateTagsDto } from 'src/tags/dto/update-tags.dto';

export class UpdateMovieDto {
  @IsOptional()
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'releaseを入力してください' })
  release: number;

  @IsOptional()
  @IsNotEmpty({ message: 'timeを入力してください' })
  time: number;

  @IsOptional()
  @IsNotEmpty({ message: 'countriesを入力してください' })
  countries: UpdateCountriesDto[];

  @IsOptional()
  @IsNotEmpty({ message: 'studioを入力してください' })
  studios: UpdateStudiosDto[];

  @IsOptional()
  @IsNotEmpty({ message: 'crewsを入力してください' })
  crews: UpdateCrewsDto[];

  @IsOptional()
  @IsNotEmpty({ message: 'tagsを入力してください' })
  tags: UpdateTagsDto[];
}
