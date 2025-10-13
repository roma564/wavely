import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModeDto } from './dto/create-mode.dto';

@Injectable()
export class ModeService {
  constructor(private prisma: PrismaService) {}

  async getUserModes(userId: number) {
    return this.prisma.mode.findMany({
      where: { userId },
      include: { chats: true },
    });
  }

  async createModeForUser(userId: number, dto: CreateModeDto) {
    return this.prisma.mode.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  //TODO user check
 async addChatToMode(modeId: number, chatId: number) {
  return this.prisma.mode.update({
    where: { id: modeId },
    data: {
      chats: {
        connect: [{ id: chatId }],
      },
    },
  });
}

  async getChatsByMode(modeId: number) {
    return this.prisma.mode.findUnique({
      where: { id: modeId },
      include: {
        chats: true,
      },
    });
  }


}





