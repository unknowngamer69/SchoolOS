import { ApiProperty } from '@nestjs/swagger';
import { Staff } from '../../../generated/prisma';
import { UserBaseResponseDto } from '../../users/dto/';

export class StaffBaseResponseDto implements Staff {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  role!: string;
  @ApiProperty()
  phoneNumber!: string;
  @ApiProperty()
  userId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}
export class StaffResponseDto extends StaffBaseResponseDto {
  @ApiProperty({ type: () => UserBaseResponseDto })
  user!: UserBaseResponseDto;
}
