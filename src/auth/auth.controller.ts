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
  async login(@Res({ passthrough: true }) response: Response, @Body() body: LoginDto) {
    const { access_token } = await this.authService.signIn(body.username, body.password);
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000, 
    });
    return { message: 'Logged in successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
