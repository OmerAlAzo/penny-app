import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "user email",
    example: "test@email.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "user password",
    example: "test password @1234",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
