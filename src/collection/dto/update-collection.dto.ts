import { PartialType } from '@nestjs/swagger';
import { CreateCollectionDto } from './create-collection.dto';
import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
  @IsNotEmpty({ message: 'name collection không được để trống' })
  name: string;
}
