// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';
// import { ConfigService } from '@nestjs/config';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// // import { AccessTokenPayload } from '../types/AccessTokenPayload';


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload) {
//      if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
    
//   }
// }