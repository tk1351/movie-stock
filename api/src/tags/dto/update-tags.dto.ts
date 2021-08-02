import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTagsDto {
  @IsOptional()
  @IsNotEmpty({ message: 'タグを入力してください' })
  @IsString({ message: 'タグを文字で入力してください' })
  text: string;

  @IsOptional()
  @IsNumber({}, { message: 'movieIdは数字で入力してください' })
  movieId: number;
}
