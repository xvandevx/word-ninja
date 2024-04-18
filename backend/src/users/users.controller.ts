import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() usersDto: UserDto) {
    return this.usersService.add(usersDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() usersDto: UserDto) {
    return this.usersService.update(id, usersDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
