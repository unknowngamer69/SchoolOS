import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicTermService } from './academic-term.service';
import { CreateAcademicTermDto } from './dto/create-academic-term.dto';
import { UpdateAcademicTermDto } from './dto/update-academic-term.dto';

@Controller('academic-term')
export class AcademicTermController {
  constructor(private readonly academicTermService: AcademicTermService) {}

  @Post()
  create(@Body() createAcademicTermDto: CreateAcademicTermDto) {
    return this.academicTermService.create(createAcademicTermDto);
  }

  @Get()
  findAll() {
    return this.academicTermService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicTermService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicTermDto: UpdateAcademicTermDto) {
    return this.academicTermService.update(+id, updateAcademicTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicTermService.remove(+id);
  }
}
