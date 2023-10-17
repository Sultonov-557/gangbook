import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Ordering } from "src/common/enums/Ordering.enum";
import { orderBy } from "../enum/orderBy.enum";

export class findAllUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  page: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  limit: number;

  @ApiProperty({ enum: Ordering, required: false })
  @IsOptional()
  @IsEnum(Ordering)
  ordering: Ordering;

  @ApiProperty({ enum: orderBy, required: false })
  @IsOptional()
  @IsEnum(orderBy)
  orderBy: orderBy;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  endDate: Date;
}
