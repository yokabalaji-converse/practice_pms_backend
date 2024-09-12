import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusService } from '../services/status.service';
import { StatusController } from '../controllers/status.controller';
import { Status } from '../entities/status.entity';
import { Project } from 'src/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Project])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
