import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: AuthDto) {
    const user = await this.usersService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.dataValues.password) {
      return {
        id: user.id,
        status: 'setPassword',
      };
    }

    if (!(await bcrypt.compare(loginDto.password, user.dataValues.password))) {
      throw new UnauthorizedException();
    }

    return {
      status: 'success',
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
    };
  }

  async setPassword(setPasswordDto: AuthDto) {
    const user = await this.usersService.getUserByEmail(setPasswordDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.password) {
      await user.update({
        password: await bcrypt.hash(setPasswordDto.password, 5),
      });
    }
  }

  private async validateUser(userDto: any) {
    /*const user = await  this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password);
    if (user && passwordEquals) {
        return user;
    }
    throw new UnauthorizedException({messgae: 'Unable'})*/
  }
}
