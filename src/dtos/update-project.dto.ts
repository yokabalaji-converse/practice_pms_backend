import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({ description: 'The name of the project' })
  @IsOptional()
  @IsString()
  projectName?: string;

  @ApiPropertyOptional({
    description: 'The start date of the project in ISO format',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'The end date of the project in ISO format',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Percentage of tasks completed',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  tasksPercentage?: number;

  @ApiPropertyOptional({
    description: 'Indicates whether role-up is enabled',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  roleUp?: boolean;

  @ApiPropertyOptional({ description: 'A brief description of the project' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'The access level of the project' })
  @IsOptional()
  @IsString()
  projectAccess?: string;

  @ApiPropertyOptional({ description: 'The status of the project' })
  @IsOptional()
  @IsString()
  statuss?: string;

  @ApiPropertyOptional({
    description: 'Indicates whether documents are included',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  document?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates whether a timesheet is included',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  timeSheet?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates whether subtasks are included',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  subtask?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates whether dependency tracking is enabled',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  dependency?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates whether status timeline is enabled',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  statusTimeline?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates whether activity stream is enabled',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activityStream?: boolean;

  @ApiPropertyOptional({
    description: 'The name of the group associated with the project',
  })
  @IsOptional()
  @IsString()
  groupName?: string;

  @ApiPropertyOptional({ description: 'The ID of the owner of the project' })
  @IsOptional()
  @IsNumber()
  ownerId?: number;

  @ApiPropertyOptional({ description: 'The ID of the project status' })
  @IsOptional()
  @IsNumber()
  projectStatusId?: number;

  @ApiPropertyOptional({
    description: 'An array of tag string associated with the project',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  tagNames?: string[];

  @ApiPropertyOptional({ description: 'The user who created the project' })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional({ description: 'The user who updated the task status' })
  @IsArray()
  @IsOptional()
  status?: { statusName: string; colourCode: string }[];

  @ApiPropertyOptional({
    description: 'An array of levels strings associated with the project',
    type: [Array],
  })
  @IsArray()
  @IsOptional()
  levels?: { levelName: string; colorCode: string }[];
}
