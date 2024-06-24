import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Available không được để trống' })
  available: boolean;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'handle không được để trống' })
  handle: string;

  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'price không được để trống' })
  price: number;

  @IsNotEmpty({ message: 'price_max không được để trống' })
  price_max: number;

  @IsNotEmpty({ message: 'price_min không được để trống' })
  price_min: number;


  @IsNotEmpty({ message: 'title không được để trống' })
  title: string;

  @IsNotEmpty({ message: 'type không được để trống' })
  type: string;

  @IsNotEmpty({ message: 'url không được để trống' })
  url: string;

  @IsNotEmpty({ message: 'pagetitle không được để trống' })
  pagetitle: string;

  @IsNotEmpty({ message: 'not_allow_promotion không được để trống' })
  not_allow_promotion: boolean;

  @IsNotEmpty({ message: 'sole_quantity không được để trống' })
  sole_quantity: number;

  @IsNotEmpty({ message: 'colletion không được để trống' })
  collection: string;

  @IsNotEmpty({ message: 'promotion không được để trống' })
  promotion: string;

  @IsNotEmpty({ message: 'vendor không được để trống' })
  vendor: string;

  @IsNotEmpty({ message: 'media_type không được để trống' })
  media_type: string;

  @IsNotEmpty({ message: 'media_type không được để trống' })
  code_product: string

  @IsNotEmpty({ message: 'material không được để trống' })
  material: string 

  @IsNotEmpty({ message: 'material không được để trống' })
  weight: string

  
}
