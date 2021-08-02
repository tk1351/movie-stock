import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetCrewsQueryParams {
  name?: string;
  category?: 1 | 2 | 3 | 4;

  @IsOptional()
  @IsNotEmpty({ message: '取得開始する数字を入力してください' })
  offset: number;

  @IsOptional()
  @IsNotEmpty({ message: '取得数を入力してください' })
  limit: number;
}
