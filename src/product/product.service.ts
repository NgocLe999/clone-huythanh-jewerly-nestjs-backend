import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Image, ImageDocument } from 'src/images/schemas/image.schema';
import { Product } from './schemas/product.schema';
import { ObjectId } from 'mongodb'
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Image.name) private ImageModel: SoftDeleteModel<ImageDocument>,

    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ImageDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.ProductModel.create({
      ...createProductDto,
    });
  }

  findAll() {
    return `This action returns all product`;
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

  async update(id: string, updateProductDto: UpdateProductDto) {

    // const imageId = updateProductDto.image
    return await this.ProductModel.updateOne(
      { _id: id },
      {
        ...updateProductDto,

        // updatedBy: {
        //   _id: user._id,
        //   email: user.email,
        // },
        $push: {
          image: (updateProductDto.image),
          media: (updateProductDto.media),
          // featured_image: { $each: updateProductDto.featured_image },
          // image: { $each: (updateProductDto.image) },
          // media: { $each: (updateProductDto.media) },
        },
      },

      { upsert: true },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
