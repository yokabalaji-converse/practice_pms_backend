import { Test, TestingModule } from '@nestjs/testing';
import { ProjectStatusController } from '../controllers/project-status.controller';
import { ProjectStatusService } from '../services/project-status.service';

describe('ProjectStatusController', () => {
  let controller: ProjectStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectStatusController],
      providers: [ProjectStatusService],
    }).compile();

    controller = module.get<ProjectStatusController>(ProjectStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
