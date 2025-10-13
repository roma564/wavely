import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateModeDto {
  @IsString()
  name: string;

  @IsString()
  primaryColor: string;

  @IsString()
  secondaryColor: string;

  @IsString()
  textColor: string;

  @IsString()
  secondaryTextColor: string;

  @IsString()
  bgColor: string;

  @IsBoolean()
  scheduledCallMode: boolean;

  @IsBoolean()
  stickers: boolean;

  @IsBoolean()
  restrictedSmileMode: boolean;

  @IsInt()
  userId: number;
}
