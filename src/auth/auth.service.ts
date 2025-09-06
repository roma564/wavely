import { Body, Injectable, Post, Res, UnauthorizedException } from '@nestjs/common';
import { GooglePayload } from './google/google-payload.type';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

// import { BadRequestException, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// // import { User } from 'src/users/users.entity';
// import { AccessToken } from './types/AccessToken';
// import { UsersService } from 'src/users/users.service';
// import { RegisterRequestDto } from './dtos/register-request.dto';
// import { User } from 'generated/prisma';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  

  async manageGoogleUser(profile: GooglePayload,  @Res({ passthrough: true }) res: Response): Promise<CreateUserDto> {

      res.cookie('username', profile.displayName)
      res.cookie('lastname', profile.name.familyName)
      res.cookie('email', profile.emails[0].value,)

    return this.userService.create({
      name: profile.displayName,
      lastname:profile.name.familyName,
      email: profile.emails[0].value,
      password:'google',

    //   avatar: profile.photos[0].value,
    });
    
  }


  async validateUser(username: string, password: string): Promise<User | null>{
     const user = await this.userService.findByUsername(username);
      if (!user) return null;

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return null;

      return user;
    }

    //   async login(user: User) {
    //   const payload = { username: user.name, sub: user.id };
    //   return {
    //   access_token: this.jwtService.sign(payload),
    //   };
    // }

async signIn( username: string, pass: string, ): Promise<{ access_token: string }> 
{ const user = await this.userService.findByUsername(username);
   if (user?.password !== pass) { 
    throw new UnauthorizedException();
   }
  const payload = { sub: user.id, username: user.name }; 
  return { access_token: await this.jwtService.signAsync(payload), 

  };


}









  

}