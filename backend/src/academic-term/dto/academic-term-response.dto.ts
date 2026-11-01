import { ApiProperty } from '@nestjs/swagger';
import { $Enums, AcademicTerm } from '../../../generated/prisma';
import { AcademicSessionBaseResponseDto } from '../../academic-session/dto';

export class AcademicTermBaseResponse implements AcademicTerm {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  startData!: Date;
  @ApiProperty()
  endData!: Date;
  @ApiProperty({ enum: $Enums.AcademicTermStatus })
  status!: $Enums.AcademicTermStatus;
  @ApiProperty()
  academicSessionId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}

export class AcademicTermResponseDto extends AcademicTermBaseResponse {
  @ApiProperty({ type: AcademicSessionBaseResponseDto })
  academicSession!: AcademicSessionBaseResponseDto;
}
