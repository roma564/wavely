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

  async create(dto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        content: dto.content,
        chatId: dto.chatId,
        userId: dto.userId,
      },
    });

    return this.prisma.message.findUnique({
      where: { id: message.id },
      include: {
        author: {
          select: {
            name: true,
            lastname: true,
            avatar: true,
          },
        },
      },
    });
  }


  findAll() {
    return this.prisma.message.findMany();
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({
    where: {id}  ,
    include: {
      author: {
        select: {
          name: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });
  }

  findAllByChat(chatId: number) {
  return this.prisma.message.findMany({
    where: {
      chatId,
    },
    include: {
      author: {
        select: {
          name: true,
          lastname: true,
          avatar: true, 
        },
      },
    },
  });
}


  findLast(chatId: number) {
  return this.prisma.message.findFirst({
    where: {
      chatId,
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      author: {
        select: {
          name: true,
          lastname: true,
          avatar: true,
        },
      },
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
