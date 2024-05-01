import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
      private jwtService: JwtService,
      private usersService: UsersService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      id: userExists.id,
      ...user,
    });
  }

  async registerUser(user: any) {
    try {
      const newUser = await this.usersService.add(user);

      return this.generateJwt({
        id: newUser.id,
        ...user
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }
}