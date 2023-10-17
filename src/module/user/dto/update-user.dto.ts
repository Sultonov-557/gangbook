import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsNotEmpty, IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/common/enums/userRole.enum";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
