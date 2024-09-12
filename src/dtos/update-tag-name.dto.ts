import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTagNameDto } from './create-tag-name.dto';

export class UpdateTagNameDto extends PartialType(CreateTagNameDto) {
  @ApiPropertyOptional({
    description: 'The name of the tag',
    example: 'Urgent',
  })
  tagName?: string;
}
