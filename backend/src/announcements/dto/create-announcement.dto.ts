import { $Enums, Announcement } from '../../../generated/prisma';

export class CreateAnnouncementDto implements Omit<
  Announcement,
  'id' | 'createdAt' | 'updatedAt'
> {
  title!: string;
  content!: string;
  targetAudience!: $Enums.AnnouncementTargetAudience;
  priority!: $Enums.AnnouncementPriority;
  schoolId!: string;
}
