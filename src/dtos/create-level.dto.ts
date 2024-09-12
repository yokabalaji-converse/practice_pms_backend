import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ description: 'The name of the level' })
  @IsString()
  levelName: string;

  @ApiProperty({ description: 'The color code of the level' })
  @IsString()
  colorCode: string;

  @ApiProperty({ description: 'The order of the level' })
  @IsString()
  levelOrder?: string;

  @ApiProperty({ description: 'User who created the level', required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;
}
