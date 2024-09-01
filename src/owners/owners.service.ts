import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find({ relations: ['projects'] });
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
    const owner = await this.findOne(id);
    Object.assign(owner, updateOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async remove(id: number): Promise<void> {
    const owner = await this.findOne(id);
    await this.ownerRepository.remove(owner);
  }
}
