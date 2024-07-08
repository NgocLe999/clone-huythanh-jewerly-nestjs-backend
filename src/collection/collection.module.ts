import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionModel } from './schemas/collection.schema';
import { Product, ProductModel } from 'src/product/schemas/product.schema';
import { Image, ImageModel } from 'src/images/schemas/image.schema';
import { ImagesService } from 'src/images/images.service';
import { ProductService } from 'src/product/product.service';
import { PromotionsService } from 'src/promotions/promotions.service';
import {
  Promotion,
  PromotionModel,
} from 'src/promotions/schemas/promotion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionModel },
      { name: Product.name, schema: ProductModel },
      { name: Image.name, schema: ImageModel },
      { name: Promotion.name, schema: PromotionModel },
    ]),
  ],
  controllers: [CollectionController],
  providers: [
    CollectionService,
    ImagesService,
    ProductService,
    PromotionsService,
  ],
  exports: [CollectionModule],
})
export class CollectionModule {}
