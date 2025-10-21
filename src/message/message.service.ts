import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from 'src/chat/chat.service';

export type Message = {
  id: number
  content: string | null
  fileUrl: string | null
  fileName: string | null
  fileSize: number | null
  mimeType: string | null
  chatId: number
  userId: number
  createdAt: Date
  updatedAt: Date
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
        content: dto.content ?? null,
        chatId: dto.chatId,
        userId: dto.userId,
        fileUrl: dto.fileUrl ?? null,
        fileName: dto.fileName ?? null,
        fileSize: dto.fileSize ?? null,
        mimeType: dto.mimeType ?? null, // 👈 додаємо mimeType
      },
      include: {
        user: true,
        chat: true,
      },
   });

  return this.prisma.message.findUnique({
    where: { id: message.id },
    include: {
      user: {
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
      user: {
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
      user: {
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
      user: {
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
