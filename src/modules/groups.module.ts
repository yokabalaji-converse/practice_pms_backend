import { Module } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { GroupsController } from '../controllers/groups.controller';
import { Group } from '../entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
