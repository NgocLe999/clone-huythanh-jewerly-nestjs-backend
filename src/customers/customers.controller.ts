import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/users/user.interface';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ResponseMessage('Create Order Success')
  @Public()
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ResponseMessage('Get All Order Success')
  @Public()
  @Get()
  findAll(currentPage: number, pageSize: number, queryString: string) {
    return this.customersService.findAll(currentPage, pageSize, queryString);
  }

  @ResponseMessage('Get Order Success')
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @ResponseMessage('Delete Order Success')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.customersService.remove(id, user);
  }
}
