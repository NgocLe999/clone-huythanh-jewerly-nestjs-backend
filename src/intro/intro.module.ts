import { Module } from '@nestjs/common';
import { IntroService } from './intro.service';
import { IntroController } from './intro.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Intro, IntroModel } from './schemas/intro.schema';
import { Image, ImageModel } from 'src/images/schemas/image.schema';
import { ImagesService } from 'src/images/images.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/images/multer.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Intro.name, schema: IntroModel },
      { name: Image.name, schema: ImageModel },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [IntroController],
  providers: [IntroService, ImagesService],
})
export class IntroModule {}
