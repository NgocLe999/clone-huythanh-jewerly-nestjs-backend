import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { IntroService } from './intro.service';
import { CreateIntroDto } from './dto/create-intro.dto';
import { UpdateIntroDto } from './dto/update-intro.dto';
import { ResponseMessage, User } from 'src/decorators/customize';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { IUser } from 'src/users/user.interface';

@Controller('intro')
export class IntroController {
  constructor(private readonly introService: IntroService) {}

  @ResponseMessage('Create Intro Information Successfully')
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() createIntroDto: CreateIntroDto,
    @UploadedFile() file: Express.Multer.File,
    @User() user: IUser,
  ) {
    const pathName = file.path.split('\\').slice(1).join('/');
    return await this.introService.create(createIntroDto, user, pathName);
  }

  @Get()
  findAll() {
    return this.introService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.introService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntroDto: UpdateIntroDto) {
    return this.introService.update(+id, updateIntroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.introService.remove(+id);
  }
}
