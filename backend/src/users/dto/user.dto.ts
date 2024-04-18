import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../../../types/user';

export class UserDto implements UserInterface {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
}
