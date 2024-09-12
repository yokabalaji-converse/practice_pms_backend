import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.preload({
      id,
      ...updateGroupDto,
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return this.groupRepository.save(group);
  }

  async remove(id: number): Promise<void> {
    const result = await this.groupRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }
}
