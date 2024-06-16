import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schemas/image.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import path from 'path';
import * as fs from 'fs';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private ImageModel: SoftDeleteModel<ImageDocument>,
  ) {}

  async create(response: any, createImageDto: CreateImageDto) {

    const image = response.map((res: any, index: number) => ({
      alt: null,
      src: res.path.split('\\').slice(1).join('/'),
      media_type: createImageDto.media_type,
      position: null,
      preview_image: {
        src: res.path.split('\\').slice(1).join('/'),
      },
    }));
    if (image.length > 0) {
      return await this.ImageModel.create(image);
    }
    return null;
  }

  findAll() {
    return `This action returns all images`;
  }

  async findOne(id: string) {
    return await this.ImageModel.findOne({ _id: id });
  }
  async remove(id: string) {
    // const image = await this.ImageModel.findOne({ _id: id });
    //   const filename = path.join(
    //     process.cwd(),
    //     'public',
    //     'images',
    //     image.path_name,
    //   );
    //   console.log(filename);
    //   // var filename = 'D:\\temp\\temp.zip';
    //   var tempFile = fs.openSync(filename, 'r');
    //   // try commenting out the following line to see the different behavior
    //   fs.closeSync(tempFile);
    //   fs.unlinkSync(filename);
    // }
    return await this.ImageModel.deleteOne({ _id: id });
  }

  // async deleteFile(fileName: string) {
  //   let result = await fs.unlink(`../../images/${fileName}`, (err) => {
  //     if (err) {
  //       console.error(err);
  //       return err;
  //     }
  //   });
  //   return result;
  // }
}
