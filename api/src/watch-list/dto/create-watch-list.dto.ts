import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWatchListDto {
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @IsNotEmpty({ message: 'directorを入力してください' })
  @IsString({ message: 'directorは文字で入力してください' })
  director: string;

  @IsNotEmpty({ message: 'releaseを入力してください' })
  release: number;

  @IsNotEmpty({ message: 'timeを入力してください' })
  time: number;

  @IsNotEmpty({ message: 'urlを入力してください' })
  @IsString({ message: 'urlは文字で入力してください' })
  url: string;
}
