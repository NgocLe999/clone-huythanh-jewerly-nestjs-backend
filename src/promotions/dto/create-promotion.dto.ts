import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePromotionDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'allowcoupon không được để trống' })
  allowcoupon: number;

  @IsNotEmpty({ message: 'amount không được để trống' })
  amount: number;

  @IsNotEmpty({ message: 'code không được để trống' })
  code: number;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'start_date không được để trống' })
  start_date: Date;

  @IsNotEmpty({ message: 'end_date không được để trống' })
  end_date: Date;

//   @IsNotEmpty({ message: 'entitled_products không được để trống' })
//   entitled_products: string;

  @IsNotEmpty({ message: 'isLimit không được để trống' })
  isLimit: boolean;

  @IsNotEmpty({ message: 'isnever_expired không được để trống' })
  isnever_expired: boolean;

  @IsNotEmpty({ message: 'ispromotion không được để trống' })
  ispromotion: boolean;

  @IsNotEmpty({ message: 'limit không được để trống' })
  limit: number;

  @IsNotEmpty({ message: 'show_on_website không được để trống' })
  show_on_website: boolean;

  @IsNotEmpty({ message: 'used không được để trống' })
  used: number;
}
