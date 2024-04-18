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
  readonly userId: number;
}
