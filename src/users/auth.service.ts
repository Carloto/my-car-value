import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

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
    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash salt and password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create user
    const user = await this.usersService.create(email, result);

    // return user
    return user;
  }

  signin() {}
}
