import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto, SubjectResponseDto, UpdateSubjectDto } from './dto';
import { User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { GeneralOkResponseDto } from '../common/dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createSubjectDto: CreateSubjectDto,
    user: User,
  ): Promise<SubjectResponseDto> {
    const { category, classes, code, schoolId, title } = createSubjectDto;

    const school = await this.prisma.school.findUnique({
      where: {
        id: schoolId,
        users: { some: { id: user.id } },
      },
      select: { id: true },
    });

    if (!school) throw new NotFoundException('School not found');

    const subject = await this.prisma.subject.create({
      data: {
        code,
        title,
        category,
        school: { connect: { id: school.id } },
        classes: { connect: classes.map((id) => ({ id })) },
      },
      include: { classes: true },
    });

    return subject;
  }

  async findAll(user: User): Promise<SubjectResponseDto[]> {
    const subjects = await this.prisma.subject.findMany({
      where: { schoolId: user.schoolId },
      include: { classes: true },
    });
    if (!subjects) throw new NotFoundException('No subject found');

    return subjects;
  }

  async findOne(id: string, user: User): Promise<SubjectResponseDto> {
    const subject = await this.prisma.subject.findUnique({
      where: { id, schoolId: user.schoolId },
      include: { classes: true },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    return subject;
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
    user: User,
  ): Promise<SubjectResponseDto> {
    const { category, classes, code, title } = updateSubjectDto;
    const subject = await this.prisma.subject.findUnique({
      where: { id, schoolId: user.schoolId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    return await this.prisma.subject.update({
      where: { id: subject.id },
      data: {
        category,
        code,
        title,
        classes: { set: classes?.map((id) => ({ id })) },
      },
      include: { classes: true },
    });
  }

  async remove(id: string, user: User): Promise<GeneralOkResponseDto> {
    const subject = await this.prisma.subject.findUnique({
      where: { id, schoolId: user.schoolId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    await this.prisma.subject.delete({ where: { id } });

    return { messages: 'Subject deleted successfully' };
  }
}
