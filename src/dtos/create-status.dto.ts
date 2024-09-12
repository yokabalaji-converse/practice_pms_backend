import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ description: 'The name of the status' })
  @IsNotEmpty()
  @IsString()
  statusName: string;

  @ApiProperty({ description: 'The color code associated with the status' })
  @IsNotEmpty()
  @IsString()
  colourCode: string;

  @ApiProperty({ description: 'The  associated with the projectId' })
  @IsOptional()
  @IsInt()
  projectId?: number;
}
