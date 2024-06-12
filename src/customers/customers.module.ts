import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerModel } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Promotion.name, schema: PromotionModel },
      // { name: Product.name, schema: ProductModel },
      // { name: Image.name, schema: ImageModel },
      // { name: Collection.name, schema: CollectionModel },
      { name: Customer.name, schema: CustomerModel },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
