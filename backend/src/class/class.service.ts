import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto, ClassResponseDto, UpdateClassDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createClassDto: CreateClassDto,
    user: User,
  ): Promise<ClassResponseDto> {
    const {
      class: className,
      classArm,
      classCapacity,
      roomLocation,
      schoolId,
      staffId,
    } = createClassDto;
    const [school, staff] = await Promise.all([
      this.prisma.school.findFirst({
        where: {
          id: schoolId,
          users: { some: { id: user.id } },
        },
      }),
      this.prisma.staff.findFirst({ where: { id: staffId } }),
    ]);

    if (!school) throw new NotFoundException('School not found');
    if (!staff) throw new NotFoundException('Staff not found');

    const createdClass = await this.prisma.class.create({
      data: {
        class: className,
        classArm,
        classCapacity,
        roomLocation,
        assignedStaff: { connect: { id: staffId } },
        school: { connect: { id: schoolId } },
      },
      include: { assignedStaff: { include: { user: true } } },
    });
    return createdClass;
  }

  async findAll(user: User): Promise<ClassResponseDto[]> {
    const classes = await this.prisma.class.findMany({
      where: { schoolId: user.schoolId },
      include: { assignedStaff: { include: { user: true } } },
    });
    if (classes.length === 0)
      throw new NotFoundException('No classes registered yet');

    return classes;
  }

  async findOne(id: string, user: User): Promise<ClassResponseDto> {
    const studentClass = await this.prisma.class.findFirst({
      where: { id, schoolId: user.schoolId },
      include: { assignedStaff: { include: { user: true } } },
    });
    if (!studentClass) throw new NotFoundException('Class not found');

    return studentClass;
  }

  async update(
    id: string,
    updateClassDto: UpdateClassDto,
    user: User,
  ): Promise<ClassResponseDto> {
    const {
      class: className,
      classArm,
      classCapacity,
      roomLocation,
      staffId,
    } = updateClassDto;
    const studentClass = await this.prisma.class.findFirst({
      where: { id, schoolId: user.schoolId },
    });
    if (!studentClass) throw new NotFoundException('Class not found');

    return await this.prisma.class.update({
      where: { id },
      data: {
        class: className,
        classArm,
        classCapacity,
        roomLocation,
        assignedStaff: { update: { id: staffId } },
      },
      include: { assignedStaff: { include: { user: true } } },
    });
  }

  async remove(id: string, user: User): Promise<GeneralOkResponseDto> {
    const studentClass = await this.prisma.class.findFirst({
      where: { id, schoolId: user.schoolId },
    });

    if (!studentClass) throw new NotFoundException('Class not found');

    await this.prisma.class.delete({ where: { id } });

    return { messages: 'Class deleted successfully' };
  }
}
