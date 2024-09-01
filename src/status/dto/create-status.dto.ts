import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ description: 'The name of the status' })
  @IsString()
  statusName: string;
}
