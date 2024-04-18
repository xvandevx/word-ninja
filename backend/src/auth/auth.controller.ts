import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth-dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    return await this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Request() req, @Response() res) {
    res.clearCookie('token');
    return res.send({ message: 'success' });
  }

  @Post('check')
  async checkIsAuth() {
    return {
      statusCode: 200,
      message: 'Authorized',
    };
  }

  @Public()
  @Post('setPassword')
  setPassword(@Body() setPasswordDto: AuthDto) {
    console.log('setPasswordDto', setPasswordDto);
    return this.authService.setPassword(setPasswordDto);
  }
}
