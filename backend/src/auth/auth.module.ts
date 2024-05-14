import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import {GoogleStrategy} from "./strategies/google.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '10d',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
