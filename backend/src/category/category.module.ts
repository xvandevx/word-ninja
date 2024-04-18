import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../users/users.model";
import {Category} from "./category.model";
import {WordCategory} from "./word-category";
import {SentenceCategory} from "./sentence-category";

@Module({
  imports: [SequelizeModule.forFeature([Category, Users, WordCategory, SentenceCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
