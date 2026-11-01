import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Class } from '../../../generated/prisma';
import { StaffResponseDto } from '../../staff/dto';

export class ClassBaseResponseDto implements Class {
  @ApiProperty()
  id!: string;
  @ApiProperty({ enum: $Enums.StudentClasses })
  class!: $Enums.StudentClasses;
  @ApiProperty({ enum: $Enums.StudentClassArm })
  classArm!: $Enums.StudentClassArm;
  @ApiProperty()
  roomLocation!: string;
  @ApiProperty()
  classCapacity!: number;
  @ApiProperty()
  staffId!: string;
  @ApiProperty()
  schoolId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}
export class ClassResponseDto extends ClassBaseResponseDto {
  @ApiProperty({ type: () => StaffResponseDto })
  assignedStaff!: StaffResponseDto;
}
