import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountriesDto {
  @IsNotEmpty({ message: '国名を入力してください' })
  @IsString({ message: '国名を文字で入力してください' })
  country: string;

  movieId?: number | undefined;
}
