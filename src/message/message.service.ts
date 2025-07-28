import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
  constructor (private prisma:PrismaService){}

  create(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data:{    
          content: dto.content,       
          chatId: dto.chatId,
          userId: dto.userId,
      }
    });
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({
      where:{
        id
      }
    });
  }

  findAllByChat(chatId: number) {
    return this.prisma.message.findMany({
      where:{
        chatId
      }
    });
  }

  findLast(chatId: number) {
    return this.prisma.message.findFirst({
      where: {
        chatId: 2,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  update(id: number, dto: UpdateMessageDto) {
    return this.prisma.message.update({
      where:{id},
      data:{
        content:dto.content
      }
    });
  }

  remove(id: number) {
    return this.prisma.message.delete({
      where:{
        id
      }
    });
  }
}
