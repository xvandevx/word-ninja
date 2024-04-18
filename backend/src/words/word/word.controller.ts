import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WordService } from './word.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WordDto } from './dto/word.dto';

@ApiBearerAuth()
@Controller('words/word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@Body() wordDto: WordDto) {
    return this.wordService.add(wordDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() wordDto: WordDto) {
    return this.wordService.update(id, wordDto);
  }

  @Get()
  getAll() {
    console.log('testset')
    return this.wordService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.wordService.delete(id);
  }
}
