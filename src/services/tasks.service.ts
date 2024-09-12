import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Status } from 'src/entities/status.entity';
import { Level } from 'src/entities/level.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { statusId, levelId, ...taskData } = createTaskDto;

    const status = statusId
      ? await this.statusRepository.findOneBy({ id: statusId })
      : null;
    const level = levelId
      ? await this.levelRepository.findOneBy({ id: levelId })
      : null;

    if (statusId && !status) {
      throw new NotFoundException('Status not found');
    }

    if (levelId && !level) {
      throw new NotFoundException('Level not found');
    }

    const task = this.taskRepository.create({
      ...taskData,
      status,
      level,
    });

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['status', 'level'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['status', 'level'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { statusId, levelId, ...updateData } = updateTaskDto;

    const task = await this.taskRepository.preload({
      id,
      ...updateData,
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (statusId) {
      const status = await this.statusRepository.findOneBy({ id: statusId });
      if (!status) {
        throw new NotFoundException('Status not found');
      }
      task.status = status;
    }

    if (levelId) {
      const level = await this.levelRepository.findOneBy({ id: levelId });
      if (!level) {
        throw new NotFoundException('Level not found');
      }
      task.level = level;
    }

    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
