import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from '../models';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }


