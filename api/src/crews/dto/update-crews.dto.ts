import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateCrewsDto {
  @IsOptional()
  @IsNotEmpty({ message: 'categoryを入力してください' })
  @IsNumber({}, { message: 'categoryは数字で入力してください' })
  category: 1 | 2 | 3 | 4;

  @IsOptional()
  @IsNotEmpty({ message: '名前を入力してください' })
  @IsString({ message: '名前は文字で入力してください' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'movieIdは数字で入力してください' })
  movieId: number;
}
