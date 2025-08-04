import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuth2Guard } from './google/google-oauth.guard';
import { Response } from 'express';

@Controller('oauth2')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

    @UseGuards(GoogleOAuth2Guard)
    @Get('login/google')
    async login(@Request() _req) {
      console.log('login with google');
    }

    @UseGuards(GoogleOAuth2Guard)
    @Get('callback')
    async callbackGoogle(@Req() req, @Res() res: Response) {
      res.redirect(`${process.env['FRONTEND_URL']}`);
    }
}
