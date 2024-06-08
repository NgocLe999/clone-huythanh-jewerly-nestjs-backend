import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name này không được để trống' })
  name: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password này không được để trống' }) // not validate nested object
  password: string;

  @IsNotEmpty({ message: 'role này không được để trống' })
  role: string;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name này không được để trống' })
  name: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password này không được để trống' }) // not validate nested object
  password: string;

  @IsNotEmpty({ message: 'Role này không được để trống' })
  role: string;
}
