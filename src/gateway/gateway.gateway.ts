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
        origin: ['http://localhost:3000']
    }
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
  createMessage(@MessageBody() data: string) {
    try {
            const jsonData = JSON.parse(data);
            // Now you can work with the jsonData object
            console.log(jsonData);
             this.server.emit(jsonData.chatId, {
              id: jsonData.id,
              content: jsonData.content,
              chatId: jsonData.chatId,
              userId: jsonData.userId,
            
            })
            return this.messageService.create(jsonData);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            
        }
        // TODO check valid user in char (if 1 2 , 3 - cannot be))

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
