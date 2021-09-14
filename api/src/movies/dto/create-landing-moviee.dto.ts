import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLandingMovieDto {
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @IsNotEmpty({ message: 'releaseを入力してください' })
  release: number;

  @IsNotEmpty({ message: 'timeを入力してください' })
  time: number;

  @IsNotEmpty({ message: 'rateを入力してください' })
  rate: number;
}
