import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';
import { CreateStatusDto } from '../dtos/create-status.dto';
import { UpdateStatusDto } from '../dtos/update-status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = this.statusRepository.create(createStatusDto);
    status.createdAt = new Date();
    return await this.statusRepository.save(status);
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find();
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusRepository.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);
    Object.assign(status, updateStatusDto);
    status.updatedAt = new Date();
    return await this.statusRepository.save(status);
  }

  async remove(id: number): Promise<void> {
    const result = await this.statusRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
  }
}

// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Status } from './entities/status.entity';
// import { CreateStatusDto } from './dto/create-status.dto';
// import { UpdateStatusDto } from './dto/update-status.dto';
// import { Project } from 'src/projects/entities/project.entity';

// @Injectable()
// export class StatusService {
//   constructor(
//     @InjectRepository(Status)
//     private readonly statusRepository: Repository<Status>,
//     @InjectRepository(Project)
//     private readonly projectRepository: Repository<Project>,
//   ) {}

//   // Create a new Status
//   async create(createStatusDto: CreateStatusDto): Promise<Status> {
//     const project = createStatusDto.projectId
//       ? await this.projectRepository.findOne({
//           where: { id: createStatusDto.projectId },
//         })
//       : null;

//     if (createStatusDto.projectId && !project) {
//       throw new BadRequestException(
//         `Project with ID ${createStatusDto.projectId} not found`,
//       );
//     }

//     const status = this.statusRepository.create({
//       ...createStatusDto,
//       project,
//     });
//     return this.statusRepository.save(status);
//   }

//   // Retrieve all Status entities
//   async findAll(): Promise<Status[]> {
//     return this.statusRepository.find({ relations: ['project'] });
//   }

//   // Retrieve a single Status by ID
//   async findOne(id: number): Promise<Status> {
//     const status = await this.statusRepository.findOne({
//       where: { id },
//       relations: ['project'],
//     });
//     if (!status) {
//       throw new NotFoundException(`Status with ID ${id} not found`);
//     }
//     return status;
//   }

//   // Update a Status
//   async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
//     const project = updateStatusDto.projectId
//       ? await this.projectRepository.findOne({
//           where: { id: updateStatusDto.projectId },
//         })
//       : undefined;

//     if (updateStatusDto.projectId && !project) {
//       throw new BadRequestException(
//         `Project with ID ${updateStatusDto.projectId} not found`,
//       );
//     }

//     const status = await this.statusRepository.preload({
//       id,
//       ...updateStatusDto,
//       project,
//     });

//     if (!status) {
//       throw new NotFoundException(`Status with ID ${id} not found`);
//     }

//     return this.statusRepository.save(status);
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.statusRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Status with ID ${id} not found`);
//     }
//   }
// }
