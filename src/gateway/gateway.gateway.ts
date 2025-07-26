import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ChatService } from 'src/chat/chat.service';

import { MessageService } from 'src/message/message.service';


@WebSocketGateway()
export class Gateway {
  constructor(private readonly gatewayService: GatewayService,
    private chatService: ChatService,
    private messageService: MessageService
    
  ) {}

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
