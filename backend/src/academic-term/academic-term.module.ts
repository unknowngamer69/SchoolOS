import { Module } from '@nestjs/common';
import { AcademicTermService } from './academic-term.service';
import { AcademicTermController } from './academic-term.controller';

@Module({
  controllers: [AcademicTermController],
  providers: [AcademicTermService],
})
export class AcademicTermModule {}
