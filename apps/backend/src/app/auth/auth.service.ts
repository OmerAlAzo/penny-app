import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"; // استيراد JwtService من NestJS
import { generateTokens } from "./auth.utils"; // استيراد دالة توليد التوكنات

import * as crypto from "crypto";

import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../lib/mailtrap/emails";
import { IUser } from "@penny-app/shared";
import { LoginDto, SignUpDto } from "../lib/dtos/auth-dtos";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<IUser>,
    private jwtService: JwtService
  ) {}

  // دالة التسجيل (Sign Up)
  async signup(signupData: SignUpDto) {
    const { name, email, password, role } = signupData;

    try {
      const userExists = await this.userModel.findOne({ email });
      if (userExists) {
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }

      if (!email.includes("@") || email.length <= 6) {
        throw new HttpException(
          "Email format is incorrect",
          HttpStatus.BAD_REQUEST
        );
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordPattern.test(password)) {
        throw new HttpException(
          "Weak password, please use a combination of uppercase and lowercase letters and numbers with a minimum of 8 characters, example: Test1234",
          HttpStatus.BAD_REQUEST
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      // استدعاء دالة توليد التوكنات بعد إنشاء المستخدم
      const token = generateTokens(
        {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        this.jwtService
      );

      return {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          token,
        },
        token,
      };
    } catch (error) {
      console.log("Error in signup", error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // دالة تسجيل الدخول (Login)
  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new HttpException("Email not found", HttpStatus.BAD_REQUEST);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("isPasswordValid", isPasswordValid);

      if (!isPasswordValid) {
        throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
      }

      // استدعاء دالة توليد التوكنات
      const token = generateTokens(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        this.jwtService
      );

      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
        token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }

      // توليد رمز الاسترجاع
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 ساعة صلاحية للرمز

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = resetTokenExpiresAt;

      await user.save();

      // إرسال الرابط عبر البريد الإلكتروني
      const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      await sendPasswordResetEmail(user.email, resetPasswordLink);

      return {
        success: true,
        message: "Password reset link sent to your email.",
      };
    } catch (error) {
      console.log("Error in forgotPassword", error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const user = await this.userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
      });

      if (!user) {
        throw new HttpException(
          "Invalid or expired reset token",
          HttpStatus.BAD_REQUEST
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;
      await user.save();

      // إرسال بريد تأكيد إعادة التعيين
      await sendResetSuccessEmail(user.email);

      return {
        success: true,
        message: "Password reset successful",
      };
    } catch (error) {
      console.log("Error in resetPassword", error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
