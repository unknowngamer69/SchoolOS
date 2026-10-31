import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAcademicSessionDto } from './create-academic-session.dto';

export class UpdateAcademicSessionDto extends PartialType(
  PickType(CreateAcademicSessionDto, ['status']),
) {}
