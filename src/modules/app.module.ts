import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ProjectsModule } from './projects.module';
import { LevelsModule } from './levels.module';
import { OwnersModule } from '../modules/owners.module';
import { GroupsModule } from './groups.module';
import { StatusModule } from '../modules/status.module';
import { Project } from '../entities/project.entity';
import { Level } from '../entities/level.entity';
import { Owner } from '../entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Status } from '../entities/status.entity';
import { GroupsService } from '../services/groups.service';
import { LevelsService } from '../services/levels.service';
import { OwnersService } from '../services/owners.service';
import { ProjectsService } from '../services/projects.service';
import { StatusService } from '../services/status.service';
import { GroupsController } from '../controllers/groups.controller';
import { LevelsController } from '../controllers/levels.controller';
import { OwnersController } from '../controllers/owners.controller';
import { ProjectsController } from '../controllers/projects.controller';
import { StatusController } from '../controllers/status.controller';
import { TagNameModule } from '../modules/tag-name.module';
import { TasksModule } from './tasks.module';
import { ProjectStatusModule } from './project-status.module';
import { TagName } from '../entities/tag-name.entity';
import { ProjectStatus } from '../entities/project-status.entity';
import { Task } from '../entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cds123',
      database: 'projectmanagementsystem',
      entities: [
        Project,
        Level,
        Owner,
        Group,
        Status,
        TagName,
        ProjectStatus,
        Task,
      ],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([
      Project,
      Level,
      Owner,
      Group,
      Status,
      TagName,
      ProjectStatus,
      Task,
    ]),

    ProjectsModule,
    LevelsModule,
    OwnersModule,
    GroupsModule,
    StatusModule,
    TagNameModule,
    TasksModule,
    ProjectStatusModule,
  ],
  controllers: [
    AppController,
    GroupsController,
    LevelsController,
    OwnersController,
    ProjectsController,
    StatusController,
  ],
  providers: [
    AppService,
    GroupsService,
    LevelsService,
    OwnersService,
    ProjectsService,
    StatusService,
  ],
})
export class AppModule {}
