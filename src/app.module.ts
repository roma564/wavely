import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { GatewayModule } from './gateway/gateway.module';




@Module({
  imports: [ UserModule, ChatModule, MessageModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
