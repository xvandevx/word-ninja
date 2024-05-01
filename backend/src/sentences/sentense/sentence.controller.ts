import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Request,
} from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SentenceDto } from './dto/sentence.dto';

@ApiBearerAuth()
@Controller('sentences/sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Post()
  async create(@Body() sentenceDto: SentenceDto, @Request() req: any) {
    return await this.sentenceService.add(sentenceDto, req?.user?.id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() sentenceDto: SentenceDto, @Request() req: any) {
    return await this.sentenceService.update(id, sentenceDto, req?.user?.id);
  }

  @Get()
  async getAll(@Request() req: any) {
    return await this.sentenceService.getAll(req?.user?.id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Request() req: any) {
    return await this.sentenceService.delete(id, req?.user?.id);
  }
}
