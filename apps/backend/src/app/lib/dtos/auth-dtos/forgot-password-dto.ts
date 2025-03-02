import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "User email for password reset",
    example: "test@email.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
