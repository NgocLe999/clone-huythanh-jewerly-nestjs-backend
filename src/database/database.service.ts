import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Users, UsersDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, ADMIN_VIP, USER_ROLE } from './sample';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectModel(Users.name)
    private UsersModel: SoftDeleteModel<UsersDocument>,

    private configService: ConfigService, // get file .env
    private usersService: UsersService, // hash password
  ) {}

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.UsersModel.countDocuments({});
      if (countUser === 0) {
        await this.UsersModel.insertMany([
          {
            name: "I'm admin",
            email: 'admin@gmail.com',
            password: this.usersService.hassPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            role: ADMIN_ROLE,
          },
          {
            name: "I'm User",
            email: 'user@gmail.com',
            password: this.usersService.hassPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            role: USER_ROLE,
          },
          {
            name: "I'm Admin Vip",
            email: 'adminvip@gmail.com',
            password: this.usersService.hassPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            role: ADMIN_VIP,
          },
        ]);
      }

      if (countUser > 0) {
        // khong tao data fake
        this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
      }
    }
  }
}
