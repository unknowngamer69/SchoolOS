import { ApiProperty } from '@nestjs/swagger';
import { $Enums, AcademicTerm } from '../../../generated/prisma';

export class CreateAcademicTermDto implements Omit<
  AcademicTerm,
  'id' | 'createdAt' | 'updatedAt'
> {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  startData!: Date;
  @ApiProperty()
  endData!: Date;
  @ApiProperty({ enum: $Enums.AcademicTermStatus, default: 'active' })
  status!: $Enums.AcademicTermStatus;
  @ApiProperty()
  academicSessionId!: string;
}
