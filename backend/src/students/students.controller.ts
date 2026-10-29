import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { GetUser, Roles } from '../auth/decorators';
import { type User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({
    summary: 'Register student',
    description: 'Register a new student',
  })
  @ApiResponse({ type: StudentResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(@Body() createStudentDto: CreateStudentDto, @GetUser() user: User) {
    return this.studentsService.create(createStudentDto, user);
  }

  @ApiOperation({
    summary: 'Get all students',
    description: 'Get  the list of all students',
  })
  @ApiResponse({ type: [StudentResponseDto], status: 200 })
  @Roles(['school_admin', 'teacher'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.studentsService.findAll(user);
  }

  @ApiOperation({
    summary: 'Get student details',
    description: 'Get details of a particular student',
  })
  @ApiResponse({ type: StudentResponseDto, status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.studentsService.findOne(id, user);
  }

  @ApiOperation({
    summary: 'Update students details',
    description: 'Update details of a particular student',
  })
  @ApiResponse({ type: StudentResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @GetUser() user: User,
  ) {
    return this.studentsService.update(id, updateStudentDto, user);
  }

  @ApiOperation({
    summary: 'Delete student details',
    description: 'Delete details of a particular student',
  })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.studentsService.remove(id, user);
  }
}
