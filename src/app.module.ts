import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarsController } from './avatars.controller';
import { AvatarsNetworkService } from './avatars.network.service';
import { Avatar, AvatarSchema } from './schemas/avatar.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UsersController } from './users.controller';
import { UsersNetworkService } from './users.network.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { createTransport } from 'nodemailer';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      'mongodb+srv://payeverapp:Jduyehfg297hd@cluster0.weq4xpp.mongodb.net/payever?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Avatar.name, schema: AvatarSchema },
    ]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://uybtzuog:Vq2_yhzM3_o-1_Xv21ORMgQTn7DkmXJf@shrimp.rmq.cloudamqp.com:5671/uybtzuog',
          ],
          queue: 'users_query',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController, AvatarsController, UsersController],
  providers: [
    UsersNetworkService,
    AvatarsNetworkService,
    {
      provide: 'MAIL_SERVICE',
      useFactory: () => {
        return createTransport({
          host: 'smtp.outlook.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'payever1111@outlook.com',
            pass: 'Kjui1490',
          },
        });
      },
    },
  ],
})
export class AppModule {}
