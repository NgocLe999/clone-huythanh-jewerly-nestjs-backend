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
import aqp from 'api-query-params';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectModel(Promotion.name)
    private PromotionModel: SoftDeleteModel<PromotionDocument>,

    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ProductDocument>,

    private productService: ProductService,
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

  async findOne(id: string) {
    return await this.PromotionModel.findOne({ _id: id }).populate({
      path: 'entitled_products',
      select: { name: 1 },
    });
  }

  async update(
    id: string,
    updatePromotionDto: UpdatePromotionDto,
    user: IUser,
  ) {
    // const product = await this.ProductModel.find({
    //   _id: { $in: [updatePromotionDto.entitled_products] },
    // });
    // console.log('check product', product);

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

  async updateProduct(product_id: string, id: string, user: IUser) {
    const promotion = await this.PromotionModel.findOne({ _id: id });
    const currentId = promotion.entitled_products;
    // console.log('check promotion: ', promotion.entitled_products);
    console.log('check curret', currentId);

    const products = await this.productService.findProductById(product_id);

    const addIdProduct = products.map((product) => product._id);

    /// Logic kiểm tra id product đã có hay chưa mới push vào ---> frontend
    const addProduct = await this.PromotionModel.updateOne(
      { _id: id },
      {
        $push: {
          entitled_products: addIdProduct,
        },
      },
    );
    return addProduct;
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
