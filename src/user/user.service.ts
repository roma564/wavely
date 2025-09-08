import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data:{
          name: dto.name,
          lastname: dto.lastname,
          email: dto.email,
          password: dto.password,
          avatar: dto.avatar
          //TODO hashing
      }
    });
  }

  async getById(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
  }

  async findAll(){
    return this.prisma.user.findMany()
  }


  async remove(id: number) {
    await this.prisma.user.delete({
      where: {
        id
      },
    })
  }

  async findByUsername(identifier: string): Promise<User | null> {
  return this.prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { name: identifier },
      ],
    },
  });
}

}
