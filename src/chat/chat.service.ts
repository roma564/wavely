import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService){}
  
  create(dto: CreateChatDto) {
    return this.prisma.chat.create({
      data:{
        subject: dto.subject,
        userAId: dto.userAId,
        userBId: dto.userBId
      }
    });
  }

  findAll() {
    return this.prisma.chat.findMany();
  }

  findOne(id: number) {
    return this.prisma.chat.findUnique({
      where:{
        id
      }
    });
  }

  update( id: number,  updateDto: UpdateChatDto) {
    return this.prisma.chat.update({
    where: {
      id
    },
    data: {
      subject: updateDto.subject,
    },
  })
  }


  remove(id: number) {
    return this.prisma.chat.delete({
      where:{
        id
      }
    });
  }
}
