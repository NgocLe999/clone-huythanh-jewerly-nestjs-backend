import { IsNotEmpty } from "class-validator";

export class CreatePromotionDto {
   @IsNotEmpty({message:'allowcoupon không được để trống'})
   allowcoupon: number
}
