import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SentenceDto } from './dto/sentence.dto';

@ApiBearerAuth()
@Controller('sentences/sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Post()
  create(@Body() sentenceDto: SentenceDto) {
    return this.sentenceService.add(sentenceDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() sentenceDto: SentenceDto) {
    return this.sentenceService.update(id, sentenceDto);
  }

  @Get()
  getAll() {
    return this.sentenceService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.sentenceService.delete(id);
  }
}
