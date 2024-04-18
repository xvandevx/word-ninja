import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
