import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PromotionDocument = HydratedDocument<Promotion>;
@Schema({ timestamps: true })
export class Promotion {
  @Prop()
  allowcoupon: number;

  @Prop()
  amount: number;

  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Product' })
  entitled_products: mongoose.Schema.Types.ObjectId;

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

  @Prop()
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
