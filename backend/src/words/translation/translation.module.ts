import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";
import {WordTranslation} from "./word-translation";
import {Translation} from "./translation.model";

@Module({
  imports: [SequelizeModule.forFeature([Translation, WordTranslation, Users])],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class WordTranslationModule {}
