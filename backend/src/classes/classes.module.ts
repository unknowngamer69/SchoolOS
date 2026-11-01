import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { ClassController } from './classes.controller';

@Module({
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
