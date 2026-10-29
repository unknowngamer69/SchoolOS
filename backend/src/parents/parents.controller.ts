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
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorators';
import { GuardianResponseDto } from './dto';
import { type User } from '../../generated/prisma';
import { GeneralOkResponseDto } from '../common/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @ApiOperation({ summary: 'Add a new parent' })
  @ApiResponse({ type: GuardianResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Post()
  create(@Body() createParentDto: CreateParentDto, @GetUser() user: User) {
    return this.parentsService.create(createParentDto, user);
  }

  @ApiOperation({ summary: 'Find all parents' })
  @ApiResponse({ type: [GuardianResponseDto], status: 200 })
  @Roles(['school_admin'])
  @Get()
  findAll(@GetUser() user: User) {
    return this.parentsService.findAll(user);
  }

  @ApiOperation({ summary: 'Find details of a particular parent' })
  @ApiResponse({ type: GuardianResponseDto, status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.parentsService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update details of a particular parent' })
  @ApiResponse({ type: GuardianResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParentDto: UpdateParentDto,
    @GetUser() user: User,
  ) {
    return this.parentsService.update(id, updateParentDto, user);
  }

  @ApiOperation({ summary: 'Delete details of a particular parent' })
  @ApiResponse({ type: GeneralOkResponseDto, status: 200 })
  @Roles(['school_admin'])
  @Delete(':id')
  remove(@Param('id') id: string, user: User) {
    return this.parentsService.remove(id, user);
  }
}
