import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  projectName: string;

  @ApiProperty({
    description: 'The start date of the project',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the project',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'A brief description of the project' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Access level of the project' })
  @IsString()
  projectAccess: string;

  @ApiProperty({ description: 'Tags associated with the project' })
  @IsString()
  tagName: string;

  @ApiProperty({ description: 'Indicates if document management is enabled' })
  @IsBoolean()
  document: boolean;

  @ApiProperty({ description: 'Indicates if time sheet tracking is enabled' })
  @IsBoolean()
  timeSheet: boolean;

  @ApiProperty({ description: 'Indicates if subtasks are enabled' })
  @IsBoolean()
  subtask: boolean;

  @ApiProperty({ description: 'Indicates if task dependencies are enabled' })
  @IsBoolean()
  dependency: boolean;

  @ApiProperty({ description: 'Indicates if status timeline is enabled' })
  @IsBoolean()
  statusTimeline: boolean;

  @ApiProperty({ description: 'Indicates if activity stream is enabled' })
  @IsBoolean()
  activityStream: boolean;

  @ApiProperty({ description: 'ID of the group associated with the project' })
  @IsNumber()
  groupId: number;

  @ApiProperty({ description: 'ID of the owner associated with the project' })
  @IsNumber()
  ownerId: number;

  @ApiProperty({ description: 'ID of the status associated with the project' })
  @IsNumber()
  statusId: number;
}
