import { PartialType } from '@nestjs/swagger';
import { CreateLevelDto } from './create-level.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @ApiPropertyOptional({
    description: 'The username of the person who updated the level',
    example: 'admin_user_updated',
  })
  updatedBy?: string;
}
