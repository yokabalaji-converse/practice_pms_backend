import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectStatusDto {
  @ApiProperty({
    description: 'The name of the project status',
    example: 'In Progress',
  })
  @IsNotEmpty()
  @IsString()
  statusName: string;

  @ApiProperty({
    description: 'The color code associated with the project status',
    example: '#FF5733',
  })
  @IsNotEmpty()
  @IsString()
  colourCode: string;
}
