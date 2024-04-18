import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@ApiBearerAuth()
@Controller('words/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() commentsDto: CategoryDto) {
    return this.categoryService.add(commentsDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() categoryDto: CategoryDto) {
    return this.categoryService.update(id, categoryDto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
