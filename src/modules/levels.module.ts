import { Module } from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { LevelsController } from '../controllers/levels.controller';
import { Level } from '../entities/level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Project])],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService],
})
export class LevelsModule {}
