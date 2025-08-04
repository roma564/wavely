import { Injectable } from '@nestjs/common';
import { GooglePayload } from './google/google-payload.type';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async manageGoogleUser(profile: GooglePayload): Promise<CreateUserDto> {
    return this.userService.create({
      name: profile.displayName,
      lastname:profile.name.familyName,
      email: profile.emails[0].value,
      password:'google',

    //   avatar: profile.photos[0].value,
    });
  }
}