import { PartialType } from '@nestjs/swagger';
import { CreateProjectStatusDto } from '../dtos/create-project-status.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProjectStatusDto extends PartialType(
  CreateProjectStatusDto,
) {
  @ApiPropertyOptional({
    description: 'The name of the project status',
    example: 'Completed',
  })
  @IsString()
  statusName?: string;

  @ApiPropertyOptional({
    description: 'The color code associated with the project status',
    example: '#00FF00',
  })
  @IsString()
  colourCode?: string;
}
