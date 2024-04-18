import { ApiProperty } from '@nestjs/swagger';
import {CategoryInterface} from "../../../../types/words/categorys";

export class CategoryDto implements CategoryInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly userId: number;
}
