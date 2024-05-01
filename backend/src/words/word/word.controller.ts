import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Request,
} from '@nestjs/common';
import { WordService } from './word.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WordDto } from './dto/word.dto';

@ApiBearerAuth()
@Controller('words/word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  async create(@Body() wordDto: WordDto, @Request() req: any) {
    await this.wordService.add(wordDto, req?.user?.id);
  }

  @Post('/minus/:id')
  async setMinus(@Param('id') id: number, @Request() req: any) {
    await this.wordService.setMinus(id, req?.user?.id);
  }

  @Post('/plus/:id')
  async setPlus(@Param('id') id: number, @Request() req: any) {
    await this.wordService.setPlus(id, req?.user?.id);
  }

  @Post('/setStatus/:id')
  async setStatus(@Param('id') id: number, @Body() wordDto: any, @Request() req: any) {
    await this.wordService.setStatus(id, wordDto, req?.user?.id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() wordDto: WordDto, @Request() req: any) {
    await this.wordService.update(id, wordDto, req?.user?.id);
  }

  @Get(':id')
  getById(@Param('id') id: number, @Request() req: any) {
    return this.wordService.getById(id, req?.user?.id);
  }

  @Get()
  getAll(@Request() req: any) {
    return this.wordService.getAll(req?.user?.id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Request() req: any) {
    await this.wordService.delete(id, req?.user?.id);
  }
}
