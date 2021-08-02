import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateCountriesDto {
  @IsOptional()
  @IsNotEmpty({ message: '国名を入力してください' })
  @IsString({ message: '国名を文字で入力してください' })
  country: string;

  @IsOptional()
  @IsNumber({}, { message: 'movieIdは数字で入力してください' })
  movieId: number;
}
