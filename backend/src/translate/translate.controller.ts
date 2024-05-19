import { Controller, Get, Query } from '@nestjs/common';
import { TranslateService } from './translate.service';
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('translate')
export class TranslateController {
    constructor(private readonly translateService: TranslateService) {}

    @Get()
    async translate(
        @Query('text') text: string,
        @Query('langFrom') langFrom: string,
        @Query('langTo') langTo: string,
    ): Promise<{}> {
        return this.translateService.translate(text, langFrom, langTo);
    }
}
