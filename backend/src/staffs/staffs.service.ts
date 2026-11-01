import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { type User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';
import { StaffResponseDto } from './dto';
import { GeneralOkResponseDto } from '../common/dto';

@Injectable()
export class StaffService {
  constructor(private readonly prima: PrismaService) {}
  async create(
    createStaffDto: CreateStaffDto,
    user: User,
  ): Promise<StaffResponseDto> {
    const {
      firstName,
      lastName,
      password,
      phoneNumber,
      role,
      schoolId,
      loginEmail,
    } = createStaffDto;
    const [school, existingUser] = await Promise.all([
      this.prima.school.findFirst({
        where: { id: schoolId, users: { some: { id: user.id } } },
        select: { id: true },
      }),
      this.prima.user.findFirst({
        where: { email: loginEmail },
        select: { id: true },
      }),
    ]);

    if (!school) throw new NotFoundException('School not found');
    if (existingUser)
      throw new ConflictException(
        'Email has already been used, try another one',
      );

    const passwordHash = await hash(password);

    const staff = await this.prima.staff.create({
      data: {
        phoneNumber,
        role,
        user: {
          create: {
            firstName,
            email: loginEmail,
            lastName,
            role: 'teacher',
            passwordHash,
            school: { connect: { id: schoolId } },
          },
        },
      },
      include: { user: true },
    });
    return staff;
  }

  async findAll(user: User): Promise<StaffResponseDto[]> {
    const staffs = await this.prima.staff.findMany({
      where: { user: { schoolId: user.schoolId } },
      include: { user: true },
    });
    if (staffs.length === 0) throw new NotFoundException('No staff found');
    return staffs;
  }

  async findOne(id: string, user: User): Promise<StaffResponseDto> {
    const staff = await this.prima.staff.findUnique({
      where: { id, user: { schoolId: user.schoolId } },
      include: { user: true },
    });
    if (!staff) throw new NotFoundException('Staff not found');

    return staff;
  }

  async update(
    id: string,
    updateStaffDto: UpdateStaffDto,
    user: User,
  ): Promise<StaffResponseDto> {
    const { firstName, lastName, loginEmail, password, phoneNumber, role } =
      updateStaffDto;

    const staff = await this.prima.staff.findUnique({
      where: { id, user: { schoolId: user.schoolId } },
      select: { id: true },
    });

    if (!staff) throw new NotFoundException('Staff  not found');

    const passwordHash = password ? await hash(password) : undefined;

    return await this.prima.staff.update({
      where: { id },
      data: {
        phoneNumber,
        role,
        user: {
          update: { firstName, lastName, email: loginEmail, passwordHash },
        },
      },
      include: { user: true },
    });
  }

  async remove(id: string, user: User): Promise<GeneralOkResponseDto> {
    const staff = await this.prima.staff.findUnique({
      where: { id, user: { schoolId: user.schoolId } },
    });
    if (!staff) throw new NotFoundException('Staff not found');

    await this.prima.user.delete({ where: { id: staff.userId } });

    return { messages: 'Staff data deleted successfully' };
  }
}
