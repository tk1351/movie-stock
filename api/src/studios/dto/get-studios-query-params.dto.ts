import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetStudiosQueryParams {
  @IsOptional()
  studio: string;

  @IsOptional()
  @IsNotEmpty({ message: '取得開始する数字を入力してください' })
  offset: number;

  @IsOptional()
  @IsNotEmpty({ message: '取得数を入力してください' })
  limit: number;
}
