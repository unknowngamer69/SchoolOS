import { ApiProperty } from '@nestjs/swagger';
import { AcademicTerm } from '../../../generated/prisma';

export class AcademicTermBaseResponse implements AcademicTerm {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  startData!: Date;
  @ApiProperty()
  endData!: Date;
  @ApiProperty()
  academicSessionId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}

export class AcademicTermResponseDto extends AcademicTermBaseResponse {}
