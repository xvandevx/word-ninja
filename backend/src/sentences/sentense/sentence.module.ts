import { Module } from '@nestjs/common';
import { SentenceController } from './sentence.controller';
import { SentenceService } from './sentence.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Users} from "../../users/users.model";

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [SentenceController],
  providers: [SentenceService],
  exports: [SentenceService],
})
export class SentenceModule {}
