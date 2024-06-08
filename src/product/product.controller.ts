import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  RawBodyRequest,
  UseInterceptors,
  UseFilters,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImagesService } from 'src/images/images.service';
import { ImagesAlbum } from 'src/images/images.interface';
import { ResponseMessage } from 'src/decorators/customize';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { CreateImageDto } from 'src/images/dto/create-image.dto';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private imageService: ImagesService,
  ) {}

  @ResponseMessage('Create Product Information Successfully')
  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        path: file.path,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    const images = await this.imageService.create(
      response,
      createProductDto.media_type as unknown as CreateImageDto,
    );
    return this.productService.create(createProductDto, images);
  }

  @Get()
  @ResponseMessage('Fetch list product paginate succesfully') // custom decorators
  findAll(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    @Query() queryString: string,
  ) {
    return this.productService.findAll(currentPage, pageSize, queryString);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ResponseMessage('Update Product Information Successfully')
  @UseFilters(new HttpExceptionFilter())
  @UseInterceptors(FilesInterceptor('files'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        path: file.path,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    const images = await this.imageService.create(
      response,
      updateProductDto.media_type as unknown as CreateImageDto,
    );
    return this.productService.update(id, updateProductDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
