import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway.gateway';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma.service';
import { ChatController } from 'src/chat/chat.controller';

@Module({
  providers: [Gateway, GatewayService, ChatService, PrismaService],
})
export class GatewayModule {}
