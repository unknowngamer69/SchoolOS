import { Test, TestingModule } from '@nestjs/testing';
import { AcademicTermService } from './academic-term.service';

describe('AcademicTermService', () => {
  let service: AcademicTermService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicTermService],
    }).compile();

    service = module.get<AcademicTermService>(AcademicTermService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
