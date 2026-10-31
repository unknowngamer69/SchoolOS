import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { ParentsModule } from './parents/parents.module';
import { APP_GUARD } from '@nestjs/core';
import { ClassModule } from './class/class.module';
import { StaffModule } from './staff/staff.module';
import { SubjectModule } from './subject/subject.module';
import { AcademicSessionModule } from './academic-session/academic-session.module';
import { AcademicTermModule } from './academic-term/academic-term.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 120, blockDuration: 120000 }],
      errorMessage:
        'We received to many request from your device, try again later',
    }),

    PrismaModule,

    AuthModule,
    UsersModule,
    StudentsModule,
    ParentsModule,
    StaffModule,
    SchoolsModule,
    ClassModule,
    SubjectModule,
    AcademicSessionModule,
    AcademicTermModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
