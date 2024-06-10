import { PartialType } from '@nestjs/swagger';
import { CreatePromotionDto } from './create-promotion.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}
