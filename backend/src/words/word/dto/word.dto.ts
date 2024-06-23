import { ApiProperty } from '@nestjs/swagger';
import {WordInterface} from "../../../../types/words/word";

export class WordDto implements WordInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly word: string;
  @ApiProperty()
  readonly translation: string;
  @ApiProperty()
  readonly pluses: number;
  @ApiProperty()
  readonly minuses: number;
  @ApiProperty()
  readonly status: number;
  @ApiProperty()
  readonly learnCount: number;
  @ApiProperty()
  readonly lastStatusDate: string;
  @ApiProperty()
  readonly comment: string;
  @ApiProperty()
  readonly userId: number;
}
