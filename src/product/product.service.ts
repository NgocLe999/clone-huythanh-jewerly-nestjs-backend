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
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Image.name) private ImageModel: SoftDeleteModel<ImageDocument>,

    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ImageDocument>,
  ) {}

  async create(createProductDto: CreateProductDto, images: any) {
    // console.log('>> check image: ', images);
    const id_image = images.map((image: any) => image._id);

    return await this.ProductModel.create({
      ...createProductDto,
      image: id_image,
      media: id_image,
      featured_image: id_image[0],
    });
  }

  async findAll(currentPagePage: number, pageSize: number, queryString: string) {
    const { filter, population } = aqp(queryString);
    console.log('>>> check: ', filter, population);

    delete filter.currentPage;
    delete filter.pageSize;

    let { sort } = aqp(queryString);
    let offset = (+currentPagePage - 1) * +pageSize;
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
        currentPage: currentPagePage, //trang hiện tại
        pageSize: pageSize, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
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
    ]);
  }

  async update(id: string, updateProductDto: UpdateProductDto, images: any) {
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

  async remove(id: string) {
    // await this.ProductModel.updateOne(
    //   { _id: id },
    //   // {
    //   //   deletedBy: {
    //   //     _id: user._id,
    //   //     email: user.email,
    //   //   },
    //   // },
    // );
    return await this.ProductModel.softDelete({ _id: id });
  }
}
