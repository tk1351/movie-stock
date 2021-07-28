import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCrewsDto {
  @IsNotEmpty({ message: 'categoryを入力してください' })
  @IsNumber({}, { message: 'categoryは数字で入力してください' })
  category: 1 | 2 | 3 | 4;

  @IsNotEmpty({ message: '名前を入力してください' })
  @IsString({ message: '名前は文字で入力してください' })
  name: string;

  movieId?: number | undefined;
}
