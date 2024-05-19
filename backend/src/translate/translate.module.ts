import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { ConfigModule } from '@nestjs/config';
import {TranslateController} from "./translate.controller";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [TranslateController],
    providers: [TranslateService],
    exports: [TranslateService],
})
export class TranslateModule {}
