import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private levelsRepository: Repository<Level>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const project = await this.projectsRepository.findOne({
      where: { id: createLevelDto.projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const level = this.levelsRepository.create({
      ...createLevelDto,
      project,
    });
    return await this.levelsRepository.save(level);
  }

  async findAll(): Promise<Level[]> {
    return await this.levelsRepository.find({ relations: ['project'] });
  }

  async findOne(id: number): Promise<Level> {
    const level = await this.levelsRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return level;
  }

  async update(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
    const level = await this.findOne(id);

    if (updateLevelDto.projectId) {
      const project = await this.projectsRepository.findOne({
        where: { id: updateLevelDto.projectId },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      level.project = project;
    }

    Object.assign(level, updateLevelDto);
    return await this.levelsRepository.save(level);
  }

  async remove(id: number): Promise<void> {
    const level = await this.findOne(id);
    await this.levelsRepository.remove(level);
  }
}
