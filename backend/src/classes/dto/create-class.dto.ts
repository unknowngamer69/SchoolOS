import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Class } from '../../../generated/prisma';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateClassDto implements Omit<
  Class,
  'id' | 'createdAt' | 'updatedAt'
> {
  @ApiProperty({ enum: $Enums.StudentClasses })
  @IsEnum($Enums.StudentClasses)
  class!: $Enums.StudentClasses;
  @ApiProperty({ enum: $Enums.StudentClassArm })
  @IsEnum($Enums.StudentClassArm)
  classArm!: $Enums.StudentClassArm;
  @ApiProperty()
  @IsString()
  roomLocation!: string;
  @ApiProperty()
  @IsNumber()
  classCapacity!: number;
  @ApiProperty()
  @IsString()
  staffId!: string;
  @ApiProperty()
  @IsUUID()
  schoolId!: string;
}
