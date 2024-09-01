import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupsRepository.create(createGroupDto);
    return await this.groupsRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupsRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    Object.assign(group, updateGroupDto);
    return await this.groupsRepository.save(group);
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await this.groupsRepository.remove(group);
  }
}
