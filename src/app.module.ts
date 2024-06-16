import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ImagesModule } from './images/images.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CollectionModule } from './collection/collection.module';
import { CustomersModule } from './customers/customers.module';
import { MailModule } from './mail/mail.module';
import { IntroModule } from './intro/intro.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 2,
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    ImagesModule,
    PromotionsModule,
    AuthModule,
    DatabaseModule,
    CollectionModule,
    CustomersModule,
    MailModule,
    IntroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
