import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AnnouncementResponseDto,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from './dto';
import { User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    user: User,
  ): Promise<AnnouncementResponseDto> {
    const { content, priority, schoolId, targetAudience, title } =
      createAnnouncementDto;
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId, users: { some: { id: user.id } } },
    });
    if (!school) throw new NotFoundException('School not found');
    const announcement = await this.prisma.announcement.create({
      data: {
        content,
        priority,
        title,
        targetAudience,
        school: { connect: { id: school.id } },
      },
    });

    return announcement;
  }

  findAll() {
    return `This action returns all announcements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} announcement`;
  }

  remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
