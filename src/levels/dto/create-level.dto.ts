import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ description: 'The name of the level' })
  @IsString()
  levelName: string;
  @ApiProperty({
    description: 'The project ID associated with the level',
    type: Number,
  })
  @IsNumber()
  projectId: number;
}
