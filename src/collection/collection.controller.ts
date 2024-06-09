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
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { IUser } from 'src/users/user.interface';
import { User } from 'src/decorators/customize';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(
    @Body() createCollectionDto: CreateCollectionDto,
    @User() user: IUser,
  ) {
    return this.collectionService.create(createCollectionDto, user);
  }

  @Get()
  findAll(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    @Query() queryString: string,
  ) {
    return this.collectionService.findAll(currentPage, pageSize, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @User() user: IUser,
  ) {
    return this.collectionService.update(id, updateCollectionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.collectionService.remove(id, user);
  }
}
