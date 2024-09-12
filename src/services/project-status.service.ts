import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectStatus } from '../entities/project-status.entity';
import { CreateProjectStatusDto } from '../dtos/create-project-status.dto';
import { UpdateProjectStatusDto } from '../dtos/update-project-status.dto';

@Injectable()
export class ProjectStatusService {
  constructor(
    @InjectRepository(ProjectStatus)
    private readonly projectStatusRepository: Repository<ProjectStatus>,
  ) {}

  async create(
    createProjectStatusDto: CreateProjectStatusDto,
  ): Promise<ProjectStatus> {
    const projectStatus = this.projectStatusRepository.create(
      createProjectStatusDto,
    );
    return this.projectStatusRepository.save(projectStatus);
  }

  async findAll(): Promise<ProjectStatus[]> {
    return this.projectStatusRepository.find({ relations: ['projects'] });
  }

  async findOne(id: number): Promise<ProjectStatus> {
    const projectStatus = await this.projectStatusRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    if (!projectStatus) {
      throw new NotFoundException(`ProjectStatus with ID ${id} not found`);
    }
    return projectStatus;
  }

  async update(
    id: number,
    updateProjectStatusDto: UpdateProjectStatusDto,
  ): Promise<ProjectStatus> {
    const projectStatus = await this.projectStatusRepository.preload({
      id,
      ...updateProjectStatusDto,
    });
    if (!projectStatus) {
      throw new NotFoundException(`ProjectStatus with ID ${id} not found`);
    }
    return this.projectStatusRepository.save(projectStatus);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectStatusRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProjectStatus with ID ${id} not found`);
    }
  }
}
