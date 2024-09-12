import { Test, TestingModule } from '@nestjs/testing';
import { TagNameController } from './tag-name.controller';
import { TagNameService } from '../services/tag-name.service';

describe('TagNameController', () => {
  let controller: TagNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagNameController],
      providers: [TagNameService],
    }).compile();

    controller = module.get<TagNameController>(TagNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
