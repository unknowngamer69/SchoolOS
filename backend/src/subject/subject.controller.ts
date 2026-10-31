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
import { SubjectService } from './subject.service';
import { CreateSubjectDto, SubjectResponseDto, UpdateSubjectDto } from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { type User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({ type: SubjectResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto, @GetUser() user: User) {
    return this.subjectService.create(createSubjectDto, user);
  }

  @ApiOperation({ summary: 'Find all subjects' })
  @ApiResponse({ type: [SubjectResponseDto], status: 200 })
  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.subjectService.findAll(user);
  }

  @ApiOperation({ summary: 'Find a particular subject' })
  @ApiResponse({ type: SubjectResponseDto, status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.subjectService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update a particular subject' })
  @ApiResponse({ type: SubjectResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @GetUser() user: User,
  ) {
    return this.subjectService.update(id, updateSubjectDto, user);
  }

  @ApiOperation({ summary: 'Delete a particular subject' })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.subjectService.remove(id, user);
  }
}
