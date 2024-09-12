import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../entities/owner.entity';
import { CreateOwnerDto } from '../dtos/create-owner.dto';
import { UpdateOwnerDto } from '../dtos/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerDto);
    return this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({ relations: ['projects'] });
  }

  async findOne(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.ownerRepository.preload({
      id,
      ...updateOwnerDto,
    });
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return this.ownerRepository.save(owner);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ownerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
  }
}
