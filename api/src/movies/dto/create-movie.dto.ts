import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTagsDto } from '../../tags/dto/create-tags.dto';
import { CreateCrewsDto } from '../../crews/dto/create-crews.dto';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @IsNotEmpty({ message: 'releaseを入力してください' })
  @IsString({ message: 'releaseは文字で入力してください' })
  release: string;

  @IsNotEmpty({ message: 'timeを入力してください' })
  @IsString({ message: 'timeは文字で入力してください' })
  time: string;

  @IsNotEmpty({ message: 'countryを入力してください' })
  @IsString({ message: 'countryは文字で入力してください' })
  country: string;

  @IsNotEmpty({ message: 'productionCompanyを入力してください' })
  @IsString({ message: 'productionCompanyは文字で入力してください' })
  productionCompany: string;

  @IsNotEmpty({ message: 'crewsを入力してください' })
  crews: CreateCrewsDto[];

  @IsNotEmpty({ message: 'tagsを入力してください' })
  tags: CreateTagsDto[];
}
