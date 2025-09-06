import { Body, Controller, Get, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuth2Guard } from './google/google-oauth.guard';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';

@Controller('oauth2')
export class AuthController {
  constructor(private readonly authService: AuthService,
      private userService: UserService,
      private jwtService: JwtService
  ) {
  }

    @UseGuards(GoogleOAuth2Guard)
    @Get('login/google')
    async login(@Request() _req) {
      console.log('login with google');
    }

    @UseGuards(GoogleOAuth2Guard)
    @Get('callback')
    async callbackGoogle(@Req() req, @Res({ passthrough: true }) res: Response, ) {
      
      const user = req.user;

      res.cookie('username', user.name);
      res.cookie('lastname', user.lastname);
      res.cookie('email', user.email);
      res.cookie('avatar', user.avatar);


      res.redirect(`${process.env['FRONTEND_URL']}`);
    }

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // async login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    //   return this.authService.login(req.user);
    // }
    // @Post('register')
    // async register(
    //   @Body() registerBody: RegisterRequestDto,
    // ): Promise<RegisterResponseDTO | BadRequestException> {
    //   return await this.authService.register(registerBody);
    // }
    

  //   async signIn(
  //   username: string,
  //   pass: string,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.userService.findByUsername(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.id, username: user.name };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
