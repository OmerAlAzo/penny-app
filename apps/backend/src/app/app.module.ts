import { Module } from "@nestjs/common";
import { DatabaseModule } from "./lib/database.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./products/prooduct.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { UserModule } from "./users/user.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRE: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
      }),
      envFilePath: "./.env",
    }),
    DatabaseModule,
    AuthModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
