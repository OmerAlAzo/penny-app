import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../models';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}


