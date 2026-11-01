import { IsEnum, IsString, IsUUID } from 'class-validator';
import { $Enums, Subject } from '../../../generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto implements Pick<
  Subject,
  'category' | 'code' | 'title' | 'schoolId'
> {
  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty({ enum: $Enums.SubjectCategory })
  @IsEnum($Enums.SubjectCategory)
  category!: $Enums.SubjectCategory;

  @ApiProperty()
  @IsUUID()
  schoolId!: string;

  @ApiProperty({ type: [String] })
  @IsUUID(undefined, { each: true })
  classes!: string[];
}
