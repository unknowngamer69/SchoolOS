import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';
import { GuardianResponseDto } from './dto';
import { User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@Injectable()
export class ParentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createParentDto: CreateParentDto,
    user: User,
  ): Promise<GuardianResponseDto> {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      relationship,
      password,
      schoolId,
    } = createParentDto;
    const [existingParent] = await Promise.all([
      this.prisma.guardian.findFirst({
        where: { user: { email: createParentDto.email } },
      }),
      this.prisma.school.findFirst({
        where: {
          id: schoolId,
          users: { some: { id: user.id } },
        },
      }),
    ]);
    if (existingParent)
      throw new ConflictException('Emails already in use, try another');

    const passwordHash = await hash(password);

    const parent = await this.prisma.guardian.create({
      data: {
        phoneNumber,
        relationship,
        user: {
          create: {
            email,
            firstName,
            lastName,
            passwordHash,
            role: 'parent',
            schoolId,
          },
        },
      },
      include: { user: true },
    });

    return parent;
  }

  async findAll(user: User): Promise<GuardianResponseDto[]> {
    const parents = await this.prisma.guardian.findMany({
      where: { user: { schoolId: user.schoolId } },
      include: { user: true },
    });
    if (parents.length === 0) throw new NotFoundException('No parents found');

    return parents;
  }

  async findOne(id: string, user: User): Promise<GuardianResponseDto> {
    const parent = await this.prisma.guardian.findFirst({
      where: { id, user: { schoolId: user.schoolId } },
      include: { user: true },
    });
    if (!parent) throw new NotFoundException('Parent not found');

    return parent;
  }

  async update(
    id: string,
    updateParentDto: UpdateParentDto,
    user: User,
  ): Promise<GuardianResponseDto> {
    const { email, firstName, lastName, password, phoneNumber, relationship } =
      updateParentDto;
    const parent = await this.prisma.guardian.findFirst({
      where: { id, user: { schoolId: user.schoolId } },
    });
    if (!parent) throw new NotFoundException('Parent not found');

    const passwordHash = password ? await hash(password) : undefined;

    return await this.prisma.guardian.update({
      where: { id },
      data: {
        phoneNumber,
        relationship,
        user: {
          update: { firstName, lastName, email, passwordHash },
        },
      },
      include: { user: true },
    });
  }

  async remove(id: string, user: User): Promise<GeneralOkResponseDto> {
    const parent = await this.prisma.guardian.findFirst({
      where: { id, user: { schoolId: user.schoolId } },
    });
    if (!parent) throw new NotFoundException('Parent not found');

    await this.prisma.user.delete({ where: { id: parent.userId } });

    return { messages: 'Parent details deleted successfully' };
  }
}
