import { Test, TestingModule } from '@nestjs/testing';
import { TagNameService } from '../services/tag-name.service';

describe('TagNameService', () => {
  let service: TagNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagNameService],
    }).compile();

    service = module.get<TagNameService>(TagNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
