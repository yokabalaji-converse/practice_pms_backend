import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  projectName: string;

  @ApiProperty({ description: 'The start date of the project in ISO format' })
  @IsDateString()
  @IsOptional()
  startDate: string;

  @ApiProperty({ description: 'The end date of the project in ISO format' })
  @IsDateString()
  @IsOptional()
  endDate: string;

  @ApiProperty({ description: 'The the projectId' })
  @IsString()
  projectId?: string;

  @ApiProperty({ description: 'Percentage of tasks completed', example: 50 })
  @IsNumber()
  tasksPercentage: number;

  @ApiProperty({
    description: 'Indicates whether role-up is enabled',
    example: true,
  })
  @IsBoolean()
  roleUp: boolean;

  @ApiProperty({ description: 'A brief description of the project' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The access level of the project' })
  @IsString()
  projectAccess: string;

  @ApiProperty({ description: 'The status of the project' })
  @IsString()
  statuss: string;

  @ApiProperty({
    description: 'Indicates whether documents are included',
    example: true,
  })
  @IsBoolean()
  document: boolean;

  @ApiProperty({
    description: 'Indicates whether a timesheet is included',
    example: true,
  })
  @IsBoolean()
  timeSheet: boolean;

  @ApiProperty({
    description: 'Indicates whether subtasks are included',
    example: true,
  })
  @IsBoolean()
  subtask: boolean;

  @ApiProperty({
    description: 'Indicates whether dependency tracking is enabled',
    example: true,
  })
  @IsBoolean()
  dependency: boolean;

  @ApiProperty({
    description: 'Indicates whether status timeline is enabled',
    example: true,
  })
  @IsBoolean()
  statusTimeline: boolean;

  @ApiProperty({
    description: 'Indicates whether activity stream is enabled',
    example: true,
  })
  @IsBoolean()
  activityStream: boolean;

  @ApiProperty({
    description: 'The name of the group associated with the project',
  })
  @IsString()
  groupName: string;

  @ApiProperty({ description: 'The ID of the owner of the project' })
  @IsNumber()
  ownerId: number;

  @ApiProperty({ description: 'The ID of the project status' })
  @IsNumber()
  projectStatusId: number;

  @ApiProperty({
    description: 'An array of tag strings associated with the project',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  tagNames: string[];

  @ApiProperty({
    description: 'An array of levels strings associated with the project',
    type: [],
  })
  @IsArray()
  levels: { levelName: string; colorCode: string }[];

  @ApiProperty({ description: 'The user who created the task status' })
  @IsArray()
  status?: { statusName: string; colourCode: string }[];

  @ApiPropertyOptional({ description: 'The user who created the project' })
  @IsOptional()
  @IsString()
  createdBy?: string;
}
