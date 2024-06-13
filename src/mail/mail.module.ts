import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { Product, ProductModel } from 'src/product/schemas/product.schema';
import { Customer, CustomerModel } from 'src/customers/schemas/customer.schema';
import { ProductService } from 'src/product/product.service';
import { ImagesService } from 'src/images/images.service';
import { Image, ImageModel } from 'src/images/schemas/image.schema';
import {
  Collection,
  CollectionModel,
} from 'src/collection/schemas/collection.schema';
import {
  Promotion,
  PromotionModel,
} from 'src/promotions/schemas/promotion.schema';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_AUTH_USER'),
            pass: configService.get<string>('EMAIL_AUTH_PASSWORD'),
          },
        },
        preview:
          configService.get<string>('EMAIL_TEMPLATE_PREVIEW') === 'true'
            ? true
            : false,
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductModel },
      { name: Customer.name, schema: CustomerModel },
      { name: Image.name, schema: ImageModel },
      { name: Collection.name, schema: CollectionModel },
      { name: Promotion.name, schema: PromotionModel },
    ]),
  ],
  controllers: [MailController],
  providers: [MailService, ProductService, ImagesService, CustomersService],
})
export class MailModule {}
