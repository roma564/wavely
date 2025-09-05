import { Injectable, Res } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { GooglePayload } from './google-payload.type';
import { response } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // For more details see:  https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env['AUTH_GOOGLE_KEY'],
      clientSecret: process.env['AUTH_GOOGLE_SECRET'],
      callbackURL: process.env['GOOGLE_CALLBACK_URL'],
      passReqToCallback: true,
      scope: ['profile', 'email'],
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: GooglePayload,
    
  ): Promise<any> {
    console.log(profile.photos?.[0]?.value)
    return {
    name: profile.displayName,
    lastname: profile.name.familyName,
    email: profile.emails[0].value,
    avatar: profile.photos?.[0]?.value || ''
  };
  
   
    
  }
}