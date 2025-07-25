import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsInt()
  chatId: number;

  @IsInt()
  userId: number;
}
