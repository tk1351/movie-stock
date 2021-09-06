import { IsOptional, IsNotEmpty } from 'class-validator';
import { SortType } from '../../types/type';

export class GetMoviesByDecadeQueryParams {
  @IsOptional()
  rate: SortType;

  @IsOptional()
  release: SortType;

  @IsOptional()
  movieId: SortType;

  @IsOptional()
  @IsNotEmpty({ message: '取得開始する数字を入力してください' })
  offset: number;

  @IsOptional()
  @IsNotEmpty({ message: '取得数を入力してください' })
  limit: number;
}
