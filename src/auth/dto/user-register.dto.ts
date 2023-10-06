import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  avatar?: string;
}
