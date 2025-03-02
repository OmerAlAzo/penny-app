import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '../lib/dtos/auth-dtos';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // دالة تسجيل المستخدم
  @Post('signup') async signup(@Body() signupData: SignUpDto) {
    return this.authService.signup(signupData);
  }

  @Post('login') async login(@Body() loginData: LoginDto) {
    console.log('loginData',loginData);
    return this.authService.login(loginData);
  }

  @Post('forgot-password') async forgotPassword(@Body() forgoData: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgoData.email);
  }

  @Post('reset-password/:token') 
  async resetPassword(@Param('token') token: string, @Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(token, body.password);
  }

}





