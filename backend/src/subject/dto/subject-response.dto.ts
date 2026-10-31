import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Subject } from '../../../generated/prisma';
import { ClassBaseResponseDto } from '../../class/dto';

export class SubjectBaseResponseDto implements Subject {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  code!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty({ enum: $Enums.SubjectCategory })
  category!: $Enums.SubjectCategory;
  @ApiProperty()
  schoolId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}
export class SubjectResponseDto extends SubjectBaseResponseDto {
  @ApiProperty({ type: [ClassBaseResponseDto] })
  classes!: ClassBaseResponseDto[];
}
