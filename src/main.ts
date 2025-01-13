import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://uybtzuog:Vq2_yhzM3_o-1_Xv21ORMgQTn7DkmXJf@shrimp.rmq.cloudamqp.com:5671/uybtzuog',
      ],
      queue: 'users_query',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
