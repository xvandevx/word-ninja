import { ApiProperty } from '@nestjs/swagger';
import {TranslationInterface} from "../../../../types/words/translation";

export class TranslationDto implements TranslationInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly translation: string;
  @ApiProperty()
  readonly userId: number;
}
