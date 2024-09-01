import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = this.statusRepository.create(createStatusDto);
    return await this.statusRepository.save(status);
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find();
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({ where: { id } });
    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);
    Object.assign(status, updateStatusDto);
    return await this.statusRepository.save(status);
  }

  async remove(id: number): Promise<void> {
    const status = await this.findOne(id);
    await this.statusRepository.remove(status);
  }
}
