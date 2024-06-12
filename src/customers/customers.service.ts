import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { async } from 'rxjs';
import aqp from 'api-query-params';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private CustomerModel: SoftDeleteModel<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.CustomerModel.create(createCustomerDto);
  }

  async findAll(currentPage: number, pageSize: number, queryString: string) {
    const { filter, population } = aqp(queryString);
    // console.log('>>> check: ', filter, population);

    delete filter.currentPage;
    delete filter.pageSize;

    let { sort } = aqp(queryString);
    console.log('check sort', sort);

    let offset = (+currentPage - 1) * +pageSize;
    let defaultLimit = +pageSize ? +pageSize : 10;

    const totalItems = (await this.CustomerModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit); // làm tròn

    const result = await this.CustomerModel.find(filter)
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

  findOne(id: string) {
    return this.CustomerModel.findOne({ _id: id }).populate({
      path: 'product_order',
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: string, user: IUser) {
    await this.CustomerModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.CustomerModel.softDelete({ _id: id });
  }
}
