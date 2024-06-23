import { ApiProperty } from '@nestjs/swagger';
import {SentenceInterface} from "../../../../types/sentences/sentence";

export class SentenceDto implements SentenceInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly sentence: string;
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
