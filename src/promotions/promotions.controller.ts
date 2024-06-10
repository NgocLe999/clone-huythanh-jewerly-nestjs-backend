import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/users/user.interface';
import { ProductService } from 'src/product/product.service';

@Controller('promotion')
export class PromotionsController {
  constructor(
    private readonly promotionsService: PromotionsService,
    private readonly productsService: ProductService,
  ) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto, @User() user: IUser) {
    return this.promotionsService.create(createPromotionDto, user);
  }

  @Get()
  findAll() {
    return this.promotionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(id);
  }

  @ResponseMessage('Update Promotions Successfully')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
    @User() user: IUser,
  ) {
    return this.promotionsService.update(id, updatePromotionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.promotionsService.remove(id, user);
  }
}
