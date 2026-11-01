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
import { AnnouncementsService } from './announcements.service';
import {
  AnnouncementResponseDto,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { type User } from '../../generated/prisma';
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @ApiOperation({ summary: 'Add a new announcement' })
  @ApiResponse({ type: AnnouncementResponseDto, status: 201 })
  @Roles(['school_admin'])
  @Post()
  create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @GetUser() user: User,
  ) {
    return this.announcementsService.create(createAnnouncementDto, user);
  }

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(+id);
  }

  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(+id, updateAnnouncementDto);
  }

  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(+id);
  }
}
