import { Module } from '@nestjs/common';
import { SubjectService } from './subjects.service';
import { SubjectController } from './subjects.controller';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
