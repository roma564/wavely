import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator'
import { ThemeName } from '@prisma/client'

export class CreateModeDto {
  @IsString()
  name: string 

  @IsEnum(ThemeName)
  theme: ThemeName 

  @IsBoolean()
  scheduledCallMode: boolean

  @IsBoolean()
  stickers: boolean

  @IsBoolean()
  restrictedSmileMode: boolean

  @IsInt()
  userId: number
}
