import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCollectionDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'product id không được để trống' })
  product: string[];
}
