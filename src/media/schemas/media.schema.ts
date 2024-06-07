import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;
@Schema({ timestamps: true })
export class Media {
//   @Prop()
//   id: number;

  @Prop()
  alt: string;

  @Prop()
  position: number;

  @Prop()
  media_type: string;

  @Prop({ type: Object })
  preview_image: {
    src: string;
  };

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
export const MediaModel = SchemaFactory.createForClass(Media);
