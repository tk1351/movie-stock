import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'メールアドレスを入力してください' })
  @IsEmail({}, { message: 'メールアドレスの形式で入力してください' })
  email: string;

  @IsNotEmpty({ message: 'subを入力してください' })
  @IsString({ message: 'subを文字で入力してください' })
  sub: string;
}
