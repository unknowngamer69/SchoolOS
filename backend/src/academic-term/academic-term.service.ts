import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAcademicTermDto } from './dto/create-academic-term.dto';
import { UpdateAcademicTermDto } from './dto/update-academic-term.dto';
import { User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { AcademicTermResponseDto } from './dto';

@Injectable()
export class AcademicTermService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createAcademicTermDto: CreateAcademicTermDto,
    user: User,
  ): Promise<AcademicTermResponseDto> {
    const { academicSessionId, endData, name, startData, status } =
      createAcademicTermDto;

    const academicSession = await this.prisma.academicSession.findUnique({
      where: { id: academicSessionId, schoolId: user.schoolId },
    });
    if (!academicSession)
      throw new NotFoundException('Academic session not found');

    const academicTerm = await this.prisma.$transaction(async (tx) => {
      if (status === 'active')
        await tx.academicTerm.updateMany({
          where: { academicSessionId },
          data: { status: 'inactive' },
        });

      return await tx.academicTerm.create({
        data: {
          endData,
          name,
          startData,
          academicSession: { connect: { id: academicSessionId } },
        },
        include: { academicSession: true },
      });
    });
    return academicTerm;
  }

  async findAll(user: User): Promise<AcademicTermResponseDto[]> {
    const academicTerms = await this.prisma.academicTerm.findMany({
      where: { academicSession: { schoolId: user.schoolId } },
      include: { academicSession: true },
    });

    if (academicTerms.length === 0)
      throw new NotFoundException('No academic term found');

    return academicTerms;
  }

  async findOne(id: string, user: User): Promise<AcademicTermResponseDto> {
    const academicTerm = await this.prisma.academicTerm.findUnique({
      where: { id, academicSession: { schoolId: user.schoolId } },
      include: { academicSession: true },
    });
    if (!academicTerm) throw new NotFoundException('Academic term not found');

    return academicTerm;
  }

  async update(
    id: string,
    updateAcademicTermDto: UpdateAcademicTermDto,
    user: User,
  ): Promise<AcademicTermResponseDto> {
    const { status } = updateAcademicTermDto;
    const academicTerm = await this.prisma.academicTerm.findUnique({
      where: { id, academicSession: { schoolId: user.schoolId } },
      include: { academicSession: true },
    });
    if (!academicTerm) throw new NotFoundException('Academic term not found');

    if (!status || academicTerm.status === status) return academicTerm;

    return await this.prisma.$transaction(async (tx) => {
      await tx.academicTerm.updateMany({
        where: { academicSession: { schoolId: user.schoolId } },
        data: { status: 'inactive' },
      });

      return await tx.academicTerm.update({
        where: { id: academicTerm.id },
        data: { status: 'active' },
        include: { academicSession: true },
      });
    });
  }

  remove(id: string, user: User): Promise<AcademicTermResponseDto> {
    return `This action removes a #${id} academicTerm`;
  }
}
