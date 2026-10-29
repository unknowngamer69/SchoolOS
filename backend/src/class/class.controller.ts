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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { ClassResponseDto } from './dto';
import { type User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({ summary: 'Create  a new class' })
  @ApiResponse({ type: ClassResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(@Body() createClassDto: CreateClassDto, @GetUser() user: User) {
    return this.classService.create(createClassDto, user);
  }

  @ApiOperation({ summary: 'Get all classes under your school' })
  @ApiResponse({ type: [ClassResponseDto], status: 200 })
  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.classService.findAll(user);
  }

  @ApiOperation({ summary: 'Get details of a particular class' })
  @ApiResponse({ type: ClassResponseDto, status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.classService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update class details' })
  @ApiResponse({ type: ClassResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
    @GetUser() user: User,
  ) {
    return this.classService.update(id, updateClassDto, user);
  }

  @ApiOperation({ summary: 'Delete class details' })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.classService.remove(id, user);
  }
}
