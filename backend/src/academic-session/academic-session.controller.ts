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
import { AcademicSessionService } from './academic-session.service';
import {
  AcademicSessionResponseDto,
  CreateAcademicSessionDto,
  UpdateAcademicSessionDto,
} from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { type User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('academic-session')
export class AcademicSessionController {
  constructor(
    private readonly academicSessionService: AcademicSessionService,
  ) {}

  @ApiOperation({ summary: 'Add a new academic session' })
  @ApiResponse({ type: AcademicSessionResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(
    @Body() createAcademicSessionDto: CreateAcademicSessionDto,
    @GetUser() user: User,
  ) {
    return this.academicSessionService.create(createAcademicSessionDto, user);
  }

  @ApiOperation({ summary: 'Find all academic sessions' })
  @ApiResponse({ type: [AcademicSessionResponseDto], status: 200 })
  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.academicSessionService.findAll(user);
  }

  @ApiOperation({ summary: 'Find a particular academic session' })
  @ApiResponse({ type: [AcademicSessionResponseDto], status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.academicSessionService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update a particular academic session' })
  @ApiResponse({ type: AcademicSessionResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcademicSessionDto: UpdateAcademicSessionDto,
    @GetUser() user: User,
  ) {
    return this.academicSessionService.update(
      id,
      updateAcademicSessionDto,
      user,
    );
  }

  @ApiOperation({ summary: 'Delete a particular academic session' })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.academicSessionService.remove(id, user);
  }
}
