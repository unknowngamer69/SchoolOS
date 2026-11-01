import { Module } from '@nestjs/common';
import { StaffService } from './staffs.service';
import { StaffController } from './staffs.controller';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
