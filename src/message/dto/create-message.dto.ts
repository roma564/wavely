import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  content?: string; // текст або лінк

  @IsInt()
  chatId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  fileUrl?: string; // шлях до файлу (і для зображень теж)

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsString()
  mimeType?: string; // 👈 нове поле для визначення типу файлу
}
