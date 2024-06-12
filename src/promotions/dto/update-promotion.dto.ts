import { PartialType } from '@nestjs/swagger';
import { CreatePromotionDto } from './create-promotion.dto';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @IsNotEmpty()
  entitled_products: mongoose.Schema.Types.ObjectId;
}
