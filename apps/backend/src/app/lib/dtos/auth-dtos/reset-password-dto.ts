import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "New password for the account",
    example: "newSecurePassword@123",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
