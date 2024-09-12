import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectStatusService } from '../services/project-status.service';
import { CreateProjectStatusDto } from '../dtos/create-project-status.dto';
import { UpdateProjectStatusDto } from '../dtos/update-project-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProjectStatus } from '../entities/project-status.entity';

@ApiTags('project-status')
@Controller('project-status')
export class ProjectStatusController {
  constructor(private readonly projectStatusService: ProjectStatusService) {}

  @Post()
  create(
    @Body() createProjectStatusDto: CreateProjectStatusDto,
  ): Promise<ProjectStatus> {
    return this.projectStatusService.create(createProjectStatusDto);
  }

  @Get()
  findAll(): Promise<ProjectStatus[]> {
    return this.projectStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectStatus> {
    return this.projectStatusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectStatusDto: UpdateProjectStatusDto,
  ): Promise<ProjectStatus> {
    return this.projectStatusService.update(+id, updateProjectStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectStatusService.remove(+id);
  }
}
