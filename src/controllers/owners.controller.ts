import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { OwnersService } from '../services/owners.service';
import { CreateOwnerDto } from '../dtos/create-owner.dto';
import { UpdateOwnerDto } from '../dtos/update-owner.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Owner } from '../entities/owner.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@ApiTags('owners')
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new owner with an image upload',
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          example: 'john_doe',
          description: 'The username of the owner',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(
    @Body() createOwnerDto: CreateOwnerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Owner> {
    if (file) {
      createOwnerDto.imageUrl = `data:image/jpeg;base64,${file.buffer.toString('base64')}`;
    }
    return this.ownersService.create(createOwnerDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new owner with an image upload',
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          example: 'john_doe',
          description: 'The username of the owner',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOwnerDto: UpdateOwnerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Owner> {
    if (file) {
      // updateOwnerDto.imageUrl = file.buffer.toString('base64');
      updateOwnerDto.imageUrl = `data:image/jpeg;base64,${file.buffer.toString('base64')}`;
    }
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Get()
  findAll(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ownersService.remove(id);
  }
}
