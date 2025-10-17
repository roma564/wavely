import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MessageService } from 'src/message/message.service';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma.service';
import { MessageModule } from 'src/message/message.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [MessageModule, ChatModule, MessageModule], 
  controllers: [ UploadController],
  providers: [UploadService ]
})
export class UploadModule {}
