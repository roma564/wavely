import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsInt()
  chatId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;
}
