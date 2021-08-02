import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTagDtos {
  @IsOptional()
  @IsNotEmpty({ message: 'タグを入力してください' })
  @IsString({ message: 'タグを文字で入力してください' })
  text: string;

  @IsOptional()
  @IsNumber({}, { message: 'movieIdは数字で入力してください' })
  movieId: number;
}
