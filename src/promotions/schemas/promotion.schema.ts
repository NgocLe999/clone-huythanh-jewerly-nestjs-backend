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

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Condition' })
  conditions: mongoose.Schema.Types.ObjectId;

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
  savings: number;

  @Prop()
  show_on_website: boolean;

  @Prop()
  used: number;
}

export const PromotionModel = SchemaFactory.createForClass(Promotion);
