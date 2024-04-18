import { ApiProperty } from '@nestjs/swagger';
import {CategoryInterface} from "../../../types/categorys";

export class CategoryDto implements CategoryInterface {
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly type: number;
}
