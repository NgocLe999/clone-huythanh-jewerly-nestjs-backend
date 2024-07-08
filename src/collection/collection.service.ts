import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Collection, CollectionDocument } from './schemas/collection.schema';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import { Image, ImageDocument } from 'src/images/schemas/image.schema';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private CollectionModel: SoftDeleteModel<CollectionDocument>,
    @InjectModel(Image.name)
    private ImageModel: SoftDeleteModel<ImageDocument>,
    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ProductDocument>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto, user: IUser) {
    return this.CollectionModel.create({
      $push: {
        product: createCollectionDto.product,
      },
      ...createCollectionDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findAll(currentPage: number, pageSize: number, queryString: string) {
    const { filter, population } = aqp(queryString);

    delete filter.currentPage;
    delete filter.pageSize;

    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * +pageSize;
    let defaultLimit = +pageSize ? +pageSize : 10;

    const totalItems = (await this.CollectionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit); // làm tròn

    const result = await this.CollectionModel.find(filter)
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

  async findOne(id: string) {
    return await this.CollectionModel.findOne({ _id: id }).populate({
      path: 'product',
    });
  }

  async findCollectionsByName(queryString: string) {
    const { filter } = aqp(queryString);
    return await this.CollectionModel.find(filter).populate({
      path: 'product',
      populate: [
        {
          path: 'featured_image',
          model: 'Image',
          select: { src: 1 },
        },
        {
          path: 'image',
          model: 'Image',
          select: { src: 1 },
        },
      ],
    });
  }

  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
    user: IUser,
  ) {
    return await this.CollectionModel.updateOne(
      { _id: id },
      {
        name: updateCollectionDto.name,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    await this.CollectionModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.CollectionModel.softDelete({ _id: id });
  }
}
