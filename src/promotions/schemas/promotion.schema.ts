import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image } from 'src/images/schemas/image.schema';
import { Product } from 'src/product/schemas/product.schema';

export type PromotionDocument = HydratedDocument<Promotion>;
@Schema({ timestamps: true })
export class Promotion {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  allowcoupon: number;

  @Prop({ isRequired: true })
  amount: number;

  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop({ isRequired: true })
  start_date: Date;

  @Prop({ isRequired: true })
  end_date: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  entitled_products: [mongoose.Schema.Types.ObjectId] | [];

  @Prop()
  isLimit: boolean;

  @Prop()
  isnever_expired: boolean;

  @Prop()
  ispromotion: boolean;

  @Prop()
  limit: number;

  @Prop()
  show_on_website: boolean;

  @Prop({ isRequired: true })
  used: number;

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
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;
}

export const PromotionModel = SchemaFactory.createForClass(Promotion);
