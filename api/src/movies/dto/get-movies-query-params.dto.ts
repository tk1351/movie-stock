import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetMoviesQueryParams {
  title?: string;
  release?: string;
  time?: string;
  country?: string;
  studio?: string;
  name?: string;
  tag?: string;

  @IsOptional()
  @IsNotEmpty({ message: '取得開始する数字を入力してください' })
  offset: number;

  @IsOptional()
  @IsNotEmpty({ message: '取得数を入力してください' })
  limit: number;
}
