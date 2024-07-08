import { Body, Controller, Get, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Customer,
  CustomerDocument,
} from 'src/customers/schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { ProductService } from 'src/product/product.service';
import { CustomersService } from 'src/customers/customers.service';
import { log } from 'console';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ProductDocument>,
    @InjectModel(Customer.name)
    private CustomerModel: SoftDeleteModel<CustomerDocument>,
    private productService: ProductService,
    private customerService: CustomersService,
  ) {}

  @Public()
  @ResponseMessage('Gửi email thành công!')
  @Get(':id')
  // @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleTestEmail(@Param('id') id: string) {
    const customer = await this.customerService.findOne(id);
    // console.log('check customer', customer.toJSON());
    if (customer && customer.product_order.length > 0) {
      const products = customer.product_order.map((product: any) => {
        return {
          name: product.name,
          quantity: product.sole_quantity,
          price: product.price.toLocaleString(),
          total: (product.price * product.sole_quantity).toLocaleString(),
        };
      });
      // const totalAll = products.map((product)=>parseInt(product.total.replace(/\D/g,'')))
      const totalPay = products.reduce(
        (acc, cur) => acc + parseInt(cur.total.replace(/\D/g, '')),
        0,
      );

      await this.mailerService.sendMail({
        to: `${customer.email}`,
        from: '"huythanhjewerly.com" <support@example.com>', // override default from
        subject: '[Huy Thanh Jewerly] Xác nhận đơn hàng! ',
        template: 'order-mail', // HTML body content
        context: {
          customer: customer.toJSON(),
          products: products,
          totalPay: `${totalPay}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'VNĐ',
        },
      });
    }
    // if (customer && customer.product_order.length > 0) {
    //   const productPrice = customer.product_order.map(
    //     (product: any) => product.price,
    //   );
    //   if (productPrice.length > 0) {
    //     const totalPay = productPrice.reduce((accumulator, currentValue) => {
    //       accumulator + currentValue;
    //     });

    //     await this.mailerService.sendMail({
    //       to: 'lexuanngoc2207@gmail.com',
    //       from: '"Support Team" <support@example.com>', // override default from
    //       subject: 'Welcome to Nice App! Confirm your Email',
    //       template: 'order-mail', // HTML body content
    //       context: {
    //         customer: customer.toJSON(),
    //         totalPay:`${totalPay}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
    //       },
    //     });
    //   }
    // }

    // }

    //todo

    //build template
  }
}

//`${job.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
