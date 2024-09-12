import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagNameService } from '../services/tag-name.service';
import { TagNameController } from '../controllers/tag-name.controller';
import { TagName } from '../entities/tag-name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagName])],
  controllers: [TagNameController],
  providers: [TagNameService],
})
export class TagNameModule {}
