import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { spec } from 'node:test/reporters';
import { Collection } from 'src/collection/schemas/collection.schema';
import { Image } from 'src/images/schemas/image.schema';
import { Promotion } from 'src/promotions/schemas/promotion.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ timestamps: true })
export class Product {
  @Prop({ isRequired: true })
  available: boolean;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
  featured_image: mongoose.Schema.Types.ObjectId | null; // hình ảnh nổi bật

  @Prop({ isRequired: true })
  handle: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Image.name }])
  image: [mongoose.Schema.Types.ObjectId] | [];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Image.name }])
  media: [mongoose.Schema.Types.ObjectId] | [];

  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop({ isRequired: true })
  price_max: number;

  @Prop({ isRequired: true })
  price_min: number;

  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  url: string; //products/bong-tai-bt-472

  @Prop()
  pagetitle: string;

  @Prop({ isRequired: true })
  vendor: string;

  @Prop()
  not_allow_promotion: boolean;

  @Prop()
  sole_quantity: number;

  @Prop()
  collection: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Promotion.name })
  promotion: mongoose.Schema.Types.ObjectId;

  @Prop()
  code_product: string;

  @Prop()
  material: string;

  @Prop()
  weight: string;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ProductModel = SchemaFactory.createForClass(Product);
