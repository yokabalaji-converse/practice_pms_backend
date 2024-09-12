import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'The name of the task',
    example: 'Update project roadmap',
  })
  @IsOptional()
  @IsString()
  taskName?: string;

  @ApiPropertyOptional({
    description: 'The percentage of completion for the task',
    example: 75,
  })
  @IsOptional()
  @IsNumber()
  taskPercentage?: number;

  @ApiPropertyOptional({
    description: 'The ID of the status associated with the task',
    example: 1,
  })
  @IsOptional()
  statusId?: number;

  @ApiPropertyOptional({
    description: 'The ID of the level associated with the task',
    example: 2,
  })
  @IsOptional()
  levelId?: number;
}
