import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";
import {Word} from "./word.model";
import {WordTranslation} from "../translation/word-translation";

@Module({
  imports: [SequelizeModule.forFeature([Word, WordTranslation, Users])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
