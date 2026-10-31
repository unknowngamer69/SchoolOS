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
import { CreateAcademicSessionDto, UpdateAcademicSessionDto } from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { type User } from '../../generated/prisma';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('academic-session')
export class AcademicSessionController {
  constructor(
    private readonly academicSessionService: AcademicSessionService,
  ) {}

  @ApiOperation({})
  @Roles(['school_admin'])
  @Post()
  create(
    @Body() createAcademicSessionDto: CreateAcademicSessionDto,
    @GetUser() user: User,
  ) {
    return this.academicSessionService.create(createAcademicSessionDto, user);
  }

  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.academicSessionService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.academicSessionService.findOne(id, user);
  }

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

  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.academicSessionService.remove(id, user);
  }
}
