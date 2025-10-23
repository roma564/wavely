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
  fileUrl?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  savedFileName?: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsString()
  mimeType?: string;
}
