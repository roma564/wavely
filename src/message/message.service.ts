import { Body, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService){}

  async create(createMessageDto: CreateMessageDto) {
  console.log('received');
  console.log(typeof createMessageDto, createMessageDto);

  const parsedData = typeof createMessageDto === 'string'
    ? JSON.parse(createMessageDto)
    : createMessageDto;

  return await this.prisma.message.create({
    data: parsedData,
  });
}




  

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
