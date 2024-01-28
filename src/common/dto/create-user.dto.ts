import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserStatus } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(10)
  mobile: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @MinLength(8)
  passwords: string;

  @IsString()
  role: string;

  @IsBoolean()
  isVerified: boolean;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsDateString()
  @IsOptional()
  DOB?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  twoFactorEnabled: boolean;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  timeZone?: string;
}
