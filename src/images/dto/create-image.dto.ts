import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateImageDto {
  @IsNotEmpty({ message: 'media_type không được để trống' })
  media_type: string;

}
