import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudiosDto {
  @IsNotEmpty({ message: '制作会社を入力してください' })
  @IsString({ message: '制作会社を文字で入力してください' })
  studio: string;

  movieId?: number | undefined;
}
