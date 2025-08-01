import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from 'src/chat/chat.service';

type Message = {
  id:number
  content:string
  chatId:number
  userId:number
  createdAt:Date,
  updatedAt:Date
}

@Injectable()
export class MessageService {
  constructor (
    private prisma:PrismaService,
    private chatService: ChatService
  ){}

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


  async findAllLast(): Promise<Message[]> {
    const allChats = await this.chatService.findAll();

    const allLastMessages = await Promise.all(
      allChats.map((chat) =>
        this.prisma.message.findFirst({
          where: { chatId: chat.id },
          orderBy: { id: 'desc' },
        })
      )
    );

    return allLastMessages.filter((msg): msg is Message => msg !== null);
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
