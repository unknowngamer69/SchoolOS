import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Announcement } from '../../../generated/prisma';

export class AnnouncementResponseDto implements Announcement {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  content!: string;
  @ApiProperty({ enum: $Enums.AnnouncementTargetAudience })
  targetAudience!: $Enums.AnnouncementTargetAudience;
  @ApiProperty({ enum: $Enums.AnnouncementPriority })
  priority!: $Enums.AnnouncementPriority;
  @ApiProperty()
  schoolId!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}
