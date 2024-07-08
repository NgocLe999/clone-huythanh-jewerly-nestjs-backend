import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  product_order: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  note:string
  
  @IsNotEmpty()
  total: string
}
