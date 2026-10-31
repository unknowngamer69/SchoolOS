import { Test, TestingModule } from '@nestjs/testing';
import { AcademicTermController } from './academic-term.controller';
import { AcademicTermService } from './academic-term.service';

describe('AcademicTermController', () => {
  let controller: AcademicTermController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicTermController],
      providers: [AcademicTermService],
    }).compile();

    controller = module.get<AcademicTermController>(AcademicTermController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
