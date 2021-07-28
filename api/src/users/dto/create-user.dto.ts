import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '名前を入力してください' })
  @IsString({ message: '名前を文字で入力してください' })
  name: string;

  @IsNotEmpty({ message: 'メールアドレスを入力してください' })
  @IsEmail({}, { message: 'メールアドレスの形式で入力してください' })
  email: string;

  @IsNotEmpty({ message: 'subを入力してください' })
  @IsString({ message: 'subを文字で入力してください' })
  sub: string;

  @IsNotEmpty({ message: 'pictureを入力してください' })
  @IsString({ message: 'pictureを文字で入力してください' })
  picture: string;
}
