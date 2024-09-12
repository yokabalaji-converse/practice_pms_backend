import { PartialType } from '@nestjs/swagger';
import { CreateOwnerDto } from './create-owner.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @ApiPropertyOptional({
    description: 'The username of the owner',
    example: 'john_doe_updated',
  })
  @IsString()
  userName?: string;

  @ApiPropertyOptional({
    description: "The URL of the owner's image",
    example: 'https://example.com/image_updated.jpg',
  })
  @IsString()
  imageUrl?: string;
}
