import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";
import {WordTranslation} from "./word-translation";

@Module({
  imports: [SequelizeModule.forFeature([WordTranslation, Users])],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class WordTranslationModule {}
