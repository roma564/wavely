import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
// import { ConfigModule } from '@nestjs/config';
import { ModeModule } from './mode/mode.module';
import { UploadModule } from './upload/upload.module';




@Module({
  imports: [ UserModule, ChatModule, MessageModule, GatewayModule, AuthModule, ModeModule, UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
