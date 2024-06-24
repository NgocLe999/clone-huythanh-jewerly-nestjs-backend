import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Image, ImageDocument } from 'src/images/schemas/image.schema';
import { Product } from './schemas/product.schema';
import { ObjectId } from 'mongodb';
import { Request } from 'express';
import aqp from 'api-query-params';
import { IUser } from 'src/users/user.interface';
import {
  Collection,
  CollectionDocument,
} from 'src/collection/schemas/collection.schema';
import {
  Promotion,
  PromotionDocument,
} from 'src/promotions/schemas/promotion.schema';
import { PromotionsService } from 'src/promotions/promotions.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Image.name) private ImageModel: SoftDeleteModel<ImageDocument>,

    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ImageDocument>,

    @InjectModel(Collection.name)
    private CollectionModel: SoftDeleteModel<CollectionDocument>,

    @InjectModel(Promotion.name)
    private PromotionModel: SoftDeleteModel<PromotionDocument>,
  ) {}

  async create(createProductDto: CreateProductDto, images: any, user: IUser) {
    const id_image = images.map((image: any) => image._id);
    let newProduct = await this.ProductModel.create({
      ...createProductDto,
      image: id_image,
      media: id_image,
      featured_image: id_image[0],
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    if (newProduct) {
      await this.PromotionModel.updateOne(
        { _id: createProductDto.promotion },
        {
          $push: {
            //@ts-ignore
            entitled_products: newProduct.promotion,
          },
        },
      );
    }

    let isExistCollection = await this.CollectionModel.findOne({
      name: newProduct.collection,
    });
    if (isExistCollection) {
      await this.CollectionModel.updateOne({
        $push: {
          product: newProduct._id,
        },
      });
    } else {
      await this.CollectionModel.create({
        name: newProduct.collection,
        $push: {
          product: newProduct._id,
        },
      });
    }
    return newProduct;
  }

  async findAll(currentPage: number, pageSize: number, queryString: string) {
    const { filter, population } = aqp(queryString);
    console.log('>>> check: ', filter, population);

    delete filter.currentPage;
    delete filter.pageSize;

    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * +pageSize;
    let defaultLimit = +pageSize ? +pageSize : 10;

    const totalItems = (await this.ProductModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit); // làm tròn

    const result = await this.ProductModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage: currentPage, //trang hiện tại
        pageSize: pageSize, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  async findProductByName(queryString: string) {
    const { filter } = aqp(queryString);
    // const arrayQuery = Object.keys(name).map((key) => name[key]);
    // console.log('check filter: ', arrayQuery);

    return await this.ProductModel.find(filter);
  }

  async findProductById(_id: string) {
    console.log(_id);
    const { filter } = aqp(_id);
    console.log('check filter: ', filter);
    return await this.ProductModel.find(filter);
  }

  async findOne(id: string) {
    return await this.ProductModel.findOne({ _id: id }).populate([
      {
        path: 'image',
        select: { src: 1 },
      },
      {
        path: 'media',
        select: {},
      },
      {
        path: 'featured_image',
        select: { src: 1 },
      },
      {
        path: 'promotion',
        select: { name: 1 },
      },
    ]);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    images: any,
    user: IUser,
  ) {
    if (images) {
      const id_image = images.map((image: any) => image._id);
      return await this.ProductModel.updateOne(
        { _id: id },
        {
          ...updateProductDto,
          featured_image: id_image[0],
          $push: {
            image: id_image,
            media: id_image,
          },
          updatedAt: {
            _id: user._id,
            email: user.email,
          },
        },
        { upsert: true },
      );
    }
    return await this.ProductModel.updateOne(
      { _id: id },
      {
        ...updateProductDto,
      },
    );
  }

  async remove(id: string, user: IUser) {
    await this.ProductModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.ProductModel.softDelete({ _id: id });
  }
}
