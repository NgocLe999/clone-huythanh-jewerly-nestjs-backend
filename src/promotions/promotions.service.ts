import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion, PromotionDocument } from './schemas/promotion.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { ProductService } from 'src/product/product.service';
import mongoose from 'mongoose';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectModel(Promotion.name)
    private PromotionModel: SoftDeleteModel<PromotionDocument>,

    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ProductDocument>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto, user: IUser) {
    return await this.PromotionModel.create({
      ...createPromotionDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  findAll() {
    return `This action returns all promotions`;
  }

  findOne(id: string) {
    return this.PromotionModel.findOne({ _id: id }).populate({
      path: 'entitled_products',
      select: { name: 1 },
    });
  }



  async update(
    id: string,
    updatePromotionDto: UpdatePromotionDto,
    user: IUser,
  ) {
    return await this.PromotionModel.updateOne(
      { _id: id },
      {
        ...updatePromotionDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    await this.PromotionModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.PromotionModel.softDelete({ _id: id });
  }
}
