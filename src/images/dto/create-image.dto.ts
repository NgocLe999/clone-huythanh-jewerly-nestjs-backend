
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';


export class CreateImageDto {
  @IsNotEmpty({ message: 'media_type không được để trống' })
  media_type: string;

}
