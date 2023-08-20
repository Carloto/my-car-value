import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // check if email already used
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email already in use');
    }

    // hash password

    // create user

    // return user
  }

  signin() {}
}
