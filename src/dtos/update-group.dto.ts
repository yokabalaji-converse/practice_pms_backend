import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiPropertyOptional({
    description: 'The username of the person who updated the group',
    example: 'admin_user_updated',
  })
  updatedBy?: string;
}
