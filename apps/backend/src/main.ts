import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './app/lib/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('docs', app, createDocument(app));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
