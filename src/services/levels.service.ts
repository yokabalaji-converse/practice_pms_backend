import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';
import { CreateLevelDto } from '../dtos/create-level.dto';
import { UpdateLevelDto } from '../dtos/update-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const level = this.levelRepository.create({
      ...createLevelDto,
    });

    return await this.levelRepository.save(level);
  }

  async findAll(): Promise<Level[]> {
    return this.levelRepository.find({ relations: ['tasks', 'projects'] });
  }

  async findOne(id: number): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['tasks', 'projects'],
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return level;
  }

  async update(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
    const level = await this.levelRepository.preload({
      id,
      ...updateLevelDto,
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return this.levelRepository.save(level);
  }

  async remove(id: number): Promise<void> {
    const result = await this.levelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
  }
}
