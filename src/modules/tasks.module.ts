import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from '../services/tasks.service';
import { TasksController } from '../controllers/tasks.controller';
import { Task } from '../entities/task.entity';
import { Status } from 'src/entities/status.entity';
import { Level } from 'src/entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Status, Level])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
