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




@Module({
  imports: [ UserModule, ChatModule, MessageModule, GatewayModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
