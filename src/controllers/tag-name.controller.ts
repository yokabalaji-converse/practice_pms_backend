import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagNameService } from '../services/tag-name.service';
import { CreateTagNameDto } from '../dtos/create-tag-name.dto';
import { UpdateTagNameDto } from '../dtos/update-tag-name.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tag-name')
@Controller('tag-name')
export class TagNameController {
  constructor(private readonly tagNameService: TagNameService) {}

  @Post()
  create(@Body() createTagNameDto: CreateTagNameDto) {
    return this.tagNameService.create(createTagNameDto);
  }

  @Get()
  findAll() {
    return this.tagNameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagNameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagNameDto: UpdateTagNameDto) {
    return this.tagNameService.update(+id, updateTagNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagNameService.remove(+id);
  }
}
