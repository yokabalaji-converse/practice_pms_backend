import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagNameDto {
  @ApiProperty({ description: 'The name of the tag' })
  @IsNotEmpty()
  @IsString()
  tagName: string;
}
