import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Complete project documentation',
  })
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty({
    description: 'The percentage of completion for the task',
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  taskPercentage: number;

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
