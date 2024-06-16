import { Injectable } from '@nestjs/common';
import { CreateIntroDto } from './dto/create-intro.dto';
import { UpdateIntroDto } from './dto/update-intro.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Intro, IntroDocument } from './schemas/intro.schema';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class IntroService {
  constructor(
    @InjectModel(Intro.name)
    private IntroModel: SoftDeleteModel<IntroDocument>,
  ) {}

  async create(createIntroDto: CreateIntroDto, user: IUser, pathName: string) {
    return await this.IntroModel.create({
      ...createIntroDto,
      image: pathName,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  findAll() {
    return `This action returns all intro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intro`;
  }

  update(id: number, updateIntroDto: UpdateIntroDto) {
    return `This action updates a #${id} intro`;
  }

  remove(id: number) {
    return `This action removes a #${id} intro`;
  }
}
