import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as process from 'process';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('test 1', token)

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log('test 2', process.env.PRIVATE_KEY)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.PRIVATE_KEY || 'SECRET',
      });
      console.log('test 3', payload)
      request['user'] = payload;
    } catch (e) {
      console.log('test 4', e?.message)
      throw new UnauthorizedException();
    }
    return request;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
