import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateProductDto extends PartialType(CreateProductDto) {
//   @IsNotEmpty({ message: 'image không được để trống' })
//   image: [mongoose.Schema.Types.ObjectId];

//   @IsNotEmpty({ message: 'media không được để trống' })
//   media: [mongoose.Schema.Types.ObjectId];

//   @IsNotEmpty({ message: 'featured_image không được để trống' })
//   featured_image: mongoose.Schema.Types.ObjectId;
}
