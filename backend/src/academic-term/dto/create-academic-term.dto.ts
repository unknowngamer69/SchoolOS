import { ApiProperty } from '@nestjs/swagger';
import { AcademicTerm } from '../../../generated/prisma';

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
  @ApiProperty()
  academicSessionId!: string;
}
