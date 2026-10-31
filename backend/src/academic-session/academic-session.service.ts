import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAcademicSessionDto,
  UpdateAcademicSessionDto,
  AcademicSessionResponseDto,
} from './dto';
import { GeneralOkResponseDto } from '../common/dto';

@Injectable()
export class AcademicSessionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createAcademicSessionDto: CreateAcademicSessionDto,
    user: User,
  ): Promise<AcademicSessionResponseDto> {
    const { endData, name, schoolId, startData, status } =
      createAcademicSessionDto;
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId, users: { some: { id: user.schoolId } } },
    });
    if (!school) throw new NotFoundException('School not found');

    const academicSession = await this.prisma.$transaction(async (tx) => {
      if (status === 'active')
        await tx.academicSession.updateMany({
          where: { schoolId: school.id },
          data: { status: 'inactive' },
        });

      return await tx.academicSession.create({
        data: {
          endData,
          name,
          startData,
          status,
          school: { connect: { id: school.id } },
        },
      });
    });

    return academicSession;
  }

  async findAll(user: User): Promise<AcademicSessionResponseDto[]> {
    const academicSessions = await this.prisma.academicSession.findMany({
      where: { schoolId: user.schoolId },
    });
    if (academicSessions.length === 0)
      throw new NotFoundException('No academic session found');
    return academicSessions;
  }

  async findOne(id: string, user: User): Promise<AcademicSessionResponseDto> {
    const academicSession = await this.prisma.academicSession.findUnique({
      where: { id, schoolId: user.schoolId },
    });
    if (!academicSession)
      throw new NotFoundException('Academic session not found');

    return academicSession;
  }

  async update(
    id: string,
    updateAcademicSessionDto: UpdateAcademicSessionDto,
    user: User,
  ): Promise<AcademicSessionResponseDto> {
    const { status } = updateAcademicSessionDto;
    const academicSession = await this.prisma.academicSession.findUnique({
      where: { id, schoolId: user.schoolId },
    });
    if (!academicSession)
      throw new NotFoundException('Academic session not found');

    if (!status) return academicSession;

    if (academicSession.status === status) return academicSession;

    if (status !== 'active')
      throw new BadRequestException(
        'You can only make an academic session active',
      );

    return await this.prisma.$transaction(async (tx) => {
      await tx.academicSession.updateMany({
        where: { schoolId: user.schoolId },
        data: { status: 'inactive' },
      });
      return tx.academicSession.update({
        where: { id },
        data: { status: 'active' },
      });
    });
  }

  async remove(id: string, user: User): Promise<GeneralOkResponseDto> {
    const academicSession = await this.prisma.academicSession.findUnique({
      where: { id, schoolId: user.schoolId },
    });
    if (!academicSession)
      throw new NotFoundException('Academic session not found');

    await this.prisma.academicSession.delete({ where: { id } });
    return { messages: 'Academic session deleted successfully' };
  }
}
