import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusDto } from './create-status.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  @ApiProperty({
    description: 'The name of the status',
    required: false,
  })
  @IsOptional()
  @IsString()
  statusName?: string;

  @ApiProperty({
    description: 'The color code associated with the status',
    required: false,
  })
  @IsOptional()
  @IsString()
  colourCode?: string;

  @ApiProperty({
    description: 'The name of the projectId',
    required: false,
  })
  @IsOptional()
  @IsInt()
  projectId?: number;
}
