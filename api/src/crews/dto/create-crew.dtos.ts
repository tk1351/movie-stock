import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCrewDtos {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  category: 1 | 2 | 3 | 4;

  @IsOptional()
  @IsNumber()
  movieId: number;
}
