import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTestController } from './category-test.controller';
import { CategoryTestService } from './category-test.service';

describe('CategoryTestController', () => {
  let controller: CategoryTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTestController],
      providers: [CategoryTestService],
    }).compile();

    controller = module.get<CategoryTestController>(CategoryTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
