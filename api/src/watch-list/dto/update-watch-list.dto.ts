import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateWatchListDto {
  @IsOptional()
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'directorを入力してください' })
  @IsString({ message: 'directorは文字で入力してください' })
  director: string;

  @IsOptional()
  @IsNotEmpty({ message: 'urlを入力してください' })
  @IsString({ message: 'urlは文字で入力してください' })
  url: string;

  @IsOptional()
  @IsNotEmpty({ message: 'releaseを入力してください' })
  release: number;

  @IsOptional()
  @IsNotEmpty({ message: 'timeを入力してください' })
  time: number;
}
