import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'The name of the group',
    example: 'Development Team',
  })
  @IsNotEmpty()
  @IsString()
  groupName: string;

  @ApiPropertyOptional({
    description: 'The username of the person who created the group',
    example: 'admin_user',
  })
  @IsString()
  createdBy?: string;
}
