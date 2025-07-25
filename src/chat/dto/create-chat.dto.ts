import { Optional } from "@nestjs/common";
import { ArrayNotEmpty, IsArray, IsInt, IsString } from "class-validator"

export class CreateChatDto {
    @IsString()
    subject :  string;

    @IsInt()
    userAId: number

    @IsInt()
    userBId: number
}
