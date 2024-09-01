import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { LevelsModule } from './levels/levels.module';
import { OwnersModule } from './owners/owners.module';
import { GroupsModule } from './groups/groups.module';
import { StatusModule } from './status/status.module';
import { Project } from './projects/entities/project.entity';
import { Level } from './levels/entities/level.entity';
import { Owner } from './owners/entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './groups/entities/group.entity';
import { Status } from './status/entities/status.entity';
import { GroupsService } from './groups/groups.service';
import { LevelsService } from './levels/levels.service';
import { OwnersService } from './owners/owners.service';
import { ProjectsService } from './projects/projects.service';
import { StatusService } from './status/status.service';
import { GroupsController } from './groups/groups.controller';
import { LevelsController } from './levels/levels.controller';
import { OwnersController } from './owners/owners.controller';
import { ProjectsController } from './projects/projects.controller';
import { StatusController } from './status/status.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cds123',
      database: 'pms',
      entities: [Project, Level, Owner, Group, Status],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Project, Level, Owner, Group, Status]),

    ProjectsModule,
    LevelsModule,
    OwnersModule,
    GroupsModule,
    StatusModule,
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
