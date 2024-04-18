import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/word')
  createWord(@Body() commentsDto: CategoryDto, @Request() req: any) {
    console.log('testset', req.user?.id)
    return this.categoryService.add(commentsDto, req?.user?.id);
  }

  @Post('/sentence')
  createSentence(@Body() commentsDto: CategoryDto, @Request() req: any) {
    return this.categoryService.add(commentsDto, req.user?.id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() categoryDto: CategoryDto) {
    return this.categoryService.update(id, categoryDto);
  }

  @Get('/word')
  getAllWord() {
    return this.categoryService.getAll(1);
  }

  @Get('/sentence')
  getAllSentence() {
    return this.categoryService.getAll(2);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
