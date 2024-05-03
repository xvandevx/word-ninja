import {
  Controller,
  Get,
  HttpStatus, Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import {Public} from "../common";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    console.log('googleAuthCallback', token)

    return res.redirect('/');
  }

  @Post('check')
  async checkIsAuth(@Req() req) {
    return {
      statusCode: 200,
      message: 'Authorized',
      user: req.user
    };
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    res.clearCookie('token');
    return res.send({ message: 'success' });
  }
}