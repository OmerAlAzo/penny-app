import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
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
    description: "user  name",
    example: "name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "please use a combination of uppercase and lowercase letters and numbers with a minimum of 8 characters, example: Test1234",
    example: "Test1234",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    required: false,
    description: "detect if  user is Primary user or not",
    example: "'admin' or 'customer'",
  })
  @IsBoolean()
  role: string;
}
