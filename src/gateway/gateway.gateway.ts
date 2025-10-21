import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ChatService } from 'src/chat/chat.service';

import { MessageService } from 'src/message/message.service';
import { Server } from 'socket.io';

type Message = {  
  id:number,
  content: string;
  chatId: number;
  userId: number;
}

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true, 
  },
})
export class Gateway {
  constructor(private readonly gatewayService: GatewayService,
    private chatService: ChatService,
    private messageService: MessageService
    
  ) {}

   @WebSocketServer()
    server: Server



  @SubscribeMessage('createChat')
  createChat(@MessageBody() data: string) {
    try {
            const jsonData = JSON.parse(data);
            // Now you can work with the jsonData object
            console.log(jsonData);
           

            return this.chatService.create(jsonData);

            
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            
        }

  }




@SubscribeMessage('createMessage')
async createMessage(@MessageBody() data: any) {
  try {
    const createdMessage = await this.messageService.create({
      chatId: Number(data.chatId),
      userId: Number(data.userId),
      content: data.content ?? null,
      fileUrl: data.fileUrl ?? null,
      fileName: data.fileName ?? null,
      fileSize: data.fileSize ?? null,
      mimeType: data.mimeType ?? null, 
    });

    this.server.emit(String(data.chatId), createdMessage);

    return createdMessage;
  } catch (e) {
    console.error('Failed to create message:', e);
    throw e;
  }
}




  @SubscribeMessage('findAllGateway')
  findAll() {
    return this.gatewayService.findAll();
  }

  @SubscribeMessage('findOneGateway')
  findOne(@MessageBody() id: number) {
    return this.gatewayService.findOne(id);
  }

  @SubscribeMessage('updateGateway')
  update(@MessageBody() updateGatewayDto: UpdateGatewayDto) {
    return this.gatewayService.update(updateGatewayDto.id, updateGatewayDto);
  }

  @SubscribeMessage('removeGateway')
  remove(@MessageBody() id: number) {
    return this.gatewayService.remove(id);
  }
}
