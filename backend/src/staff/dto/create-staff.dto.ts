import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from '../../users/dto';

export class CreateStaffDto extends CreateUserDto {
  @ApiProperty()
  @IsString()
  role!: string;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber!: string;

  @ApiProperty()
  @IsUUID()
  schoolId!: string;

  @ApiProperty()
  @IsEmail()
  loginEmail!: string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  password!: string;
}
