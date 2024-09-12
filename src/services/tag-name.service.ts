import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagName } from '../entities/tag-name.entity';
import { CreateTagNameDto } from '../dtos/create-tag-name.dto';
import { UpdateTagNameDto } from '../dtos/update-tag-name.dto';

@Injectable()
export class TagNameService {
  constructor(
    @InjectRepository(TagName)
    private readonly tagNameRepository: Repository<TagName>,
  ) {}

  async create(createTagNameDto: CreateTagNameDto): Promise<TagName> {
    const tagName = this.tagNameRepository.create(createTagNameDto);
    return this.tagNameRepository.save(tagName);
  }

  async findAll(): Promise<TagName[]> {
    return this.tagNameRepository.find();
  }

  async findOne(id: number): Promise<TagName> {
    const tagName = await this.tagNameRepository.findOne({
      where: { id },
    });
    if (!tagName) {
      throw new NotFoundException(`TagName with ID ${id} not found`);
    }
    return tagName;
  }

  async update(
    id: number,
    updateTagNameDto: UpdateTagNameDto,
  ): Promise<TagName> {
    const tagName = await this.tagNameRepository.preload({
      id,
      ...updateTagNameDto,
    });
    if (!tagName) {
      throw new NotFoundException(`TagName with ID ${id} not found`);
    }
    return this.tagNameRepository.save(tagName);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tagNameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TagName with ID ${id} not found`);
    }
  }
}
