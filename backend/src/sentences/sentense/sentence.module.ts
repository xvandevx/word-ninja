import { Module } from '@nestjs/common';
import { SentenceController } from './sentence.controller';
import { SentenceService } from './sentence.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";
import {Category} from "../../category/category.model";
import {Sentence} from "./sentence.model";

@Module({
  imports: [SequelizeModule.forFeature([Users, Category, Sentence])],
  controllers: [SentenceController],
  providers: [SentenceService],
  exports: [SentenceService],
})
export class SentenceModule {}
