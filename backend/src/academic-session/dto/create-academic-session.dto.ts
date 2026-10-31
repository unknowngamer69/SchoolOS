import { ApiProperty } from '@nestjs/swagger';
import { $Enums, AcademicSession } from '../../../generated/prisma';
import { IsDateString, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateAcademicSessionDto implements Omit<
  AcademicSession,
  'createdAt' | 'updatedAt' | 'id' | 'status'
> {
  @ApiProperty()
  @IsString()
  name!: string;
  @ApiProperty()
  @IsDateString()
  startData!: Date;
  @ApiProperty()
  @IsDateString()
  endData!: Date;
  @ApiProperty({ enum: $Enums.AcademicSessionStatus, default: 'active' })
  @IsEnum($Enums.AcademicSessionStatus)
  status!: $Enums.AcademicSessionStatus;
  @ApiProperty()
  @IsUUID()
  schoolId!: string;
}
