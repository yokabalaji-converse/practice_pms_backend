import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({
    description: 'The username of the owner',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'The Base64-encoded image of the owner',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxkwAAAABJRU5ErkJggg==',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl?: string;
}
