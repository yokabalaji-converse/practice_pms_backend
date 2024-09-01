import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: 'The name of the group' })
  @IsString()
  groupName: string;
}
