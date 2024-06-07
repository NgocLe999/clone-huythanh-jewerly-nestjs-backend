import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImagesService } from 'src/images/images.service';
import { ImagesAlbum } from 'src/images/images.interface';
import { ResponseMessage } from 'src/decorators/customize';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private imageService: ImagesService,
  ) {}

  @ResponseMessage('Create Product Information Successfully')
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ResponseMessage('Update Product Information Successfully')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
