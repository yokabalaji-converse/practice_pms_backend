import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { CreateLevelDto } from '../dtos/create-level.dto';
import { UpdateLevelDto } from '../dtos/update-level.dto';
import { Level } from '../entities/level.entity';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto): Promise<Level> {
    return this.levelsService.create(createLevelDto);
  }

  @Get()
  findAll(): Promise<Level[]> {
    return this.levelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Level> {
    return this.levelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateLevelDto: UpdateLevelDto,
  ): Promise<Level> {
    return this.levelsService.update(id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.levelsService.remove(id);
  }
}
