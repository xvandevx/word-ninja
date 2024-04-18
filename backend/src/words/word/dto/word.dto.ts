import { ApiProperty } from '@nestjs/swagger';
import {WordInterface} from "../../../../types/words/word";

export class WordDto implements WordInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly word: string;
  @ApiProperty()
  readonly comment: string;
  @ApiProperty()
  readonly userId: number;
}
