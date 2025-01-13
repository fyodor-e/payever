import { Body, Controller, Inject, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';
import { User as UserType } from './users.network.service';
import { ClientProxy } from '@nestjs/microservices';
import { Transporter } from 'nodemailer';

@Controller('api/users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('USERS_SERVICE') private usersRabbitService: ClientProxy,
    @Inject('MAIL_SERVICE') private mailService: Transporter,
  ) {}

  @Post()
  createUser(@Body() user: UserType) {
    const createdUser = new this.userModel(user);
    createdUser.save();
    this.usersRabbitService.send(
      {
        cmd: 'add-user',
      },
      'user',
    );
    this.mailService.sendMail({
      from: '"Payever 1111" <payever1111@outlook.com>', // sender address
      to: '"Payever 1111" <payever1111@outlook.com>', // list of receivers
      subject: 'User created',
      html: `<div>
      <b>User Created</b><br />
        id: ${user.id}<br />
        email: ${user.email}<br />
        first_name: ${user.first_name}<br />
        last_name: ${user.last_name}<br />
        avatar: ${user.avatar}<br />
      </div>`,
    });
  }
}
