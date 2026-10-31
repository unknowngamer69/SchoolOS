import { Module } from '@nestjs/common';
import { AcademicSessionService } from './academic-session.service';
import { AcademicSessionController } from './academic-session.controller';

@Module({
  controllers: [AcademicSessionController],
  providers: [AcademicSessionService],
})
export class AcademicSessionModule {}
