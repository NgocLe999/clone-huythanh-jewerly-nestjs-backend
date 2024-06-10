import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ImagesService } from 'src/images/images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/images/multer.config';
import { Image, ImageModel } from 'src/images/schemas/image.schema';
import { Product, ProductModel } from './schemas/product.schema';
import { CollectionService } from 'src/collection/collection.service';
import {
  Collection,
  CollectionModel,
} from 'src/collection/schemas/collection.schema';
import {
  Promotion,
  PromotionModel,
} from 'src/promotions/schemas/promotion.schema';
import { PromotionsService } from 'src/promotions/promotions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageModel },
      { name: Product.name, schema: ProductModel },
      { name: Collection.name, schema: CollectionModel },
      { name: Promotion.name, schema: PromotionModel },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ImagesService,
    CollectionService,
    PromotionsService,
  ],
  exports: [ProductModule],
})
export class ProductModule {}
