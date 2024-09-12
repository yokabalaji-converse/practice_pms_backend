import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../services/projects.service';
import { ProjectsController } from '../controllers/projects.controller';
import { Project } from '../entities/project.entity';
import { Group } from 'src/entities/group.entity';
import { Owner } from 'src/entities/owner.entity';
import { Level } from 'src/entities/level.entity';
import { ProjectStatus } from 'src/entities/project-status.entity';
import { TagName } from 'src/entities/tag-name.entity';
import { Status } from 'src/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Group,
      Owner,
      Level,
      ProjectStatus,
      TagName,
      Status,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
