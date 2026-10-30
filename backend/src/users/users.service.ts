import { Injectable, NotFoundException } from '@nestjs/common';
import { type User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findMe(user: User) {
    const userData = await this.prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      include: { guardian: true, staff: true, student: true },
    });

    return userData;
  }

  async findOne(id: string, user: User) {
    const userData = await this.prisma.user.findUnique({
      where: { id, schoolId: user.schoolId },
      include: { guardian: true, staff: true, student: true },
    });
    if (!userData) throw new NotFoundException('User not found');

    return userData;
  }
}
