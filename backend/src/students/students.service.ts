import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';
import { StudentResponseDto } from './dto';
import { GeneralOkResponseDto } from '../common/dto';
import { User } from '../../generated/prisma';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createStudentDto: CreateStudentDto,
    user: User,
  ): Promise<StudentResponseDto> {
    const {
      address,
      admissionNumber,
      bloodGroup,
      classId,
      dateOfBirth,
      firstName,
      gender,
      guardianId,
      lastName,
      schoolId,
      password,
    } = createStudentDto;
    const [school, guardian, studentClass] = await Promise.all([
      this.prisma.school.findFirst({
        where: {
          id: schoolId,
          users: { some: { id: user.id } },
        },
        select: { id: true },
      }),
      this.prisma.guardian.findFirst({
        where: { id: guardianId, user: { schoolId } },
        select: { id: true },
      }),
      this.prisma.class.findFirst({
        where: { id: classId, schoolId },
        select: { id: true },
      }),
    ]);

    if (!school) throw new NotFoundException('School not found');
    if (!guardian) throw new NotFoundException('Guardian not found');
    if (!studentClass) throw new NotFoundException('Class not found');

    const loginEmail =
      createStudentDto.loginEmail ||
      `${createStudentDto.firstName.toLowerCase()}${createStudentDto.lastName.toLowerCase()}@iqra.edu.ng`;

    const existingStudent = await this.prisma.student.findFirst({
      where: { user: { email: loginEmail }, admissionNumber },
    });

    if (existingStudent)
      throw new ConflictException(
        'Student email already in use try another one',
      );

    const passwordHash = await hash(password);

    const student = await this.prisma.student.create({
      data: {
        address,
        admissionNumber,
        bloodGroup,
        dateOfBirth,
        guardian: { connect: { id: guardianId } },
        class: { connect: { id: classId } },
        gender,
        user: {
          create: {
            firstName,
            lastName,
            email: loginEmail,
            role: 'student',
            schoolId,
            passwordHash,
          },
        },
      },
      include: { user: true },
    });

    return student;
  }

  async findAll(user: User): Promise<StudentResponseDto[]> {
    const students = await this.prisma.student.findMany({
      where: { user: { schoolId: user.schoolId } },
      include: { user: true },
    });
    if (students.length === 0)
      throw new NotFoundException('No students registered yet');
    return students;
  }

  async findOne(id: string, user: User): Promise<StudentResponseDto> {
    const student = await this.prisma.student.findUnique({
      where: { id, user: { schoolId: user.schoolId } },
      include: { user: true },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
    user: User,
  ): Promise<StudentResponseDto> {
    const {
      address,
      admissionNumber,
      bloodGroup,
      classId,
      dateOfBirth,
      firstName,
      gender,
      guardianId,
      lastName,
      loginEmail,
      password,
    } = updateStudentDto;
    const student = await this.prisma.student.findUnique({
      where: { id, user: { schoolId: user.schoolId } },
    });

    if (!student) throw new NotFoundException('Student not found');

    const passwordHash = password ? await hash(password) : undefined;

    return await this.prisma.student.update({
      where: { id },
      data: {
        address,
        admissionNumber,
        dateOfBirth,
        gender,
        bloodGroup,
        class: { update: { id: classId } },
        guardian: { update: { id: guardianId } },
        user: {
          update: { firstName, lastName, email: loginEmail, passwordHash },
        },
      },
      include: { user: true },
    });
  }

  async remove(id: string, user: User): Promise<GeneralOkResponseDto> {
    const student = await this.prisma.student.findUnique({
      where: { id, user: { schoolId: user.schoolId } },
    });
    if (!student) throw new NotFoundException('Student not found');

    await this.prisma.user.delete({ where: { id: student.userId } });

    return { messages: 'Student Details deleted' };
  }
}
