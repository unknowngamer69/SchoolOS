import { ApiProperty } from '@nestjs/swagger';
import { $Enums, AcademicSession } from '../../../generated/prisma';

export class AcademicSessionBaseResponseDto implements AcademicSession {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  startData!: Date;
  @ApiProperty()
  endData!: Date;
  @ApiProperty({ enum: $Enums.AcademicSessionStatus })
  status!: $Enums.AcademicSessionStatus;
  @ApiProperty()
  schoolId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}
export class AcademicSessionResponseDto extends AcademicSessionBaseResponseDto {}
