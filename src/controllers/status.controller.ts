import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { CreateStatusDto } from '../dtos/create-status.dto';
import { UpdateStatusDto } from '../dtos/update-status.dto';
import { Status } from '../entities/status.entity';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  async findAll(): Promise<Status[]> {
    return this.statusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Status> {
    return this.statusService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Status> {
    return this.statusService.update(id, updateStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.statusService.remove(id);
  }
}
