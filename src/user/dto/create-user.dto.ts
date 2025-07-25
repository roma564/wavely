import { Optional } from '@nestjs/common';
import { IsString, IsEmail, IsInt, ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}

