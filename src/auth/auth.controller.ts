import { Body, Controller, Get, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuth2Guard } from './google/google-oauth.guard';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('oauth2')
export class AuthController {
  constructor(private readonly authService: AuthService,
      private userService: UserService,
      private jwtService: JwtService
  ) {
  }

    @UseGuards(GoogleOAuth2Guard)
    @Get('login/google')
    async loginGoogle(@Request() _req) {
      console.log('login with google');
    }

    
    @UseGuards(GoogleOAuth2Guard)
    @Get('callback')
    async callbackGoogle(@Req() req, @Res({ passthrough: true }) res: Response) {
      const user = req.user;

      // Генерація токена
      const payload = { sub: user.id, username: user.name };
      const access_token = await this.jwtService.signAsync(payload);

      // Кукі з токеном
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000,
      });

      // Кукі з даними користувача
      res.cookie('id', user.id);
      res.cookie('username', user.name);
      res.cookie('lastname', user.lastname);
      res.cookie('email', user.email);
      res.cookie('avatar', user.avatar);

      res.redirect(`${process.env['FRONTEND_URL']}`);
    }


   


  @Post('login')
async login(@Res({ passthrough: true }) response: Response, @Body() body: LoginDto) {
  const { access_token, user } = await this.authService.signIn(body.username, body.password);

  response.cookie('access_token', access_token, {
    httpOnly: false,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000,
  });

  response.cookie('id', user.id);
  response.cookie('username', user.name);
  response.cookie('lastname', user.lastname);
  response.cookie('email', user.email);
  response.cookie('avatar', user.avatar);

  return { message: 'Logged in successfully' };
}


  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
