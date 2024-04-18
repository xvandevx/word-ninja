import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TranslationDto } from './dto/translation.dto';

@ApiBearerAuth()
@Controller('words/translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  create(@Body() translationDto: TranslationDto) {
    return this.translationService.add(translationDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() translationDto: TranslationDto) {
    return this.translationService.update(id, translationDto);
  }

  @Get()
  getAll() {
    return this.translationService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.translationService.delete(id);
  }
}
