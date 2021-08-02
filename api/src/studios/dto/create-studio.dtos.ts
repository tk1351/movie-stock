import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateStudioDtos {
  @IsOptional()
  @IsNotEmpty({ message: '制作会社を入力してください' })
  @IsString({ message: '制作会社を文字で入力してください' })
  studio: string;

  @IsOptional()
  @IsNumber({}, { message: 'movieIdは数字で入力してください' })
  movieId: number;
}
