import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiUserResponse } from './dto/user-response.dto';
import { GetUser } from '../auth/decorators';
import { type User } from '../../generated/prisma';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Find the current logged in user' })
  @ApiUserResponse()
  @Get('me')
  findMe(@GetUser() user: User) {
    return this.usersService.findMe(user);
  }
  @ApiOperation({ summary: 'Find user by id' })
  @ApiUserResponse()
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.findOne(id, user);
  }
}
