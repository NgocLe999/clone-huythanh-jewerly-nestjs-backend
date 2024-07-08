import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type CustomerDocument = HydratedDocument<Customer>;
// Schema shape data
@Schema({ timestamps: true })
export class Customer {
  @Prop()
  name: string | null;

  @Prop({ required: true })
  email: string | null;

  @Prop()
  phone: number | null;

  @Prop()
  address: string | null;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  product_order: [mongoose.Schema.Types.ObjectId] | [];

  @Prop()
  cost: number;

  @Prop()
  quantity: number;

  @Prop()
  total: number;

  @Prop()
  status: string;
  @Prop()
  note: string;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  isDeleted: boolean;
}

export const CustomerModel = SchemaFactory.createForClass(Customer);
