import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagsDto {
  @IsNotEmpty({ message: 'タグを入力してください' })
  @IsString({ message: 'タグを文字で入力してください' })
  text: string;

  movieId?: number | undefined;
}
