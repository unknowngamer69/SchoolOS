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
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { type User } from '../../generated/prisma';
import { StaffResponseDto } from './dto';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'Add a new staff' })
  @ApiResponse({ type: StaffResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(@Body() createStaffDto: CreateStaffDto, @GetUser() user: User) {
    return this.staffService.create(createStaffDto, user);
  }

  @ApiOperation({ summary: 'Find all staffs' })
  @ApiResponse({ type: [StaffResponseDto], status: 200 })
  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.staffService.findAll(user);
  }

  @ApiOperation({ summary: 'Find details of a particular staff' })
  @ApiResponse({ type: StaffResponseDto, status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.staffService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update details of a particular staff' })
  @ApiResponse({ type: StaffResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
    @GetUser() user: User,
  ) {
    return this.staffService.update(id, updateStaffDto, user);
  }

  @ApiOperation({ summary: 'Delete details of a particular staff' })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.staffService.remove(id, user);
  }
}
