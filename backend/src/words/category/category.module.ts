import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";
import {WordCategory} from "./word-categoy";

@Module({
  imports: [SequelizeModule.forFeature([WordCategory, Users])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class WordCategoryModule {}
