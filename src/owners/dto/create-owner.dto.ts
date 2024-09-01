import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({ description: 'The name of the owner' })
  @IsString()
  ownerName: string;
  @ApiProperty({ description: 'The image URL of the owner' })
  @IsString()
  imageUrl: string;
}
