import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionModel } from './schemas/promotion.schema';
import { ProductService } from 'src/product/product.service';
import { Product, ProductModel } from 'src/product/schemas/product.schema';
import { Image, ImageModel } from 'src/images/schemas/image.schema';
import {
  Collection,
  CollectionModel,
} from 'src/collection/schemas/collection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionModel },
      { name: Product.name, schema: ProductModel },
      { name: Image.name, schema: ImageModel },
      { name: Collection.name, schema: CollectionModel },
    ]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService, ProductService],
  exports: [PromotionsModule],
})
export class PromotionsModule {}
