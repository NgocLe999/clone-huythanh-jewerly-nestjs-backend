import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailService: MailService,
  ) {}
}
