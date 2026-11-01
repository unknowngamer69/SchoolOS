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
import { AcademicTermService } from './academic-term.service';
import { JwtGuard, RolesGuard } from '../auth/guard';
import {
  AcademicTermResponseDto,
  CreateAcademicTermDto,
  UpdateAcademicTermDto,
} from './dto';
import { GetUser, Roles } from '../auth/decorators';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { type User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('academic-term')
export class AcademicTermController {
  constructor(private readonly academicTermService: AcademicTermService) {}

  @ApiOperation({ summary: 'Create a new   academic term' })
  @ApiResponse({ type: AcademicTermResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(
    @Body() createAcademicTermDto: CreateAcademicTermDto,
    @GetUser() user: User,
  ) {
    return this.academicTermService.create(createAcademicTermDto, user);
  }

  @ApiOperation({ summary: 'Find all academic terms' })
  @ApiResponse({ type: [AcademicTermResponseDto], status: 200 })
  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.academicTermService.findAll(user);
  }

  @ApiOperation({ summary: 'Find a particular academic term' })
  @ApiResponse({ type: AcademicTermResponseDto, status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.academicTermService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Updata a particular academic term' })
  @ApiResponse({ type: AcademicTermResponseDto, status: 200 })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcademicTermDto: UpdateAcademicTermDto,
    @GetUser() user: User,
  ) {
    return this.academicTermService.update(id, updateAcademicTermDto, user);
  }

  @ApiOperation({ summary: 'Delete a particular academic term' })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.academicTermService.remove(id, user);
  }
}
