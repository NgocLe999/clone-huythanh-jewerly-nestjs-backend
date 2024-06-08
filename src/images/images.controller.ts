import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseFilters,
  Query,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ResponseMessage } from 'src/decorators/customize';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ResponseMessage('Upload File Succesfully')
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @UseFilters(new HttpExceptionFilter())
  create(
    @Body() createImageDto: CreateImageDto,
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
    return this.imagesService.create(response, createImageDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @ResponseMessage('Delete Image Succesfully')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }

  // @ResponseMessage('Delete Image Succesfully')
  // @Delete(':fileName')
  // async deleteFile(@Param('fileName') fileName: string) {
  //   return this  .imagesService.deleteFile(fileName);
  // }
}
