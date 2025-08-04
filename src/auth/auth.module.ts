import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { GoogleStrategy } from './google/google.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService,GoogleStrategy],
})
export class AuthModule {}
