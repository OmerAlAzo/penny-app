import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "@penny-app/shared";
import { Document, Model } from "mongoose";

export type UserDocument = Document & IUser; // هذا هو نوع الوثيقة الخاص بـ User

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private userModel: Model<UserDocument> // تعديل هنا لاستخدام UserDocument
  ) {}

  async getUsers(limit: number, offset: number): Promise<{ users: IUser[], count: number }> {
    try {
      const users = await this.userModel
        .find({ role: { $in: ["customer",'admin'] } })
        .limit(limit)
        .skip(offset); // جلب جميع المستخدمين الذين لديهم role: customer
        const count = await this.userModel.countDocuments({
          role: { $in: ["customer",'admin'] },
        });
      return {
        users: users,
        count: count
      };
    } catch (error) {
      throw new Error(`خطأ في جلب المستخدمين: ${error.message}`);
    }
  }
}
