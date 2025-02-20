import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "Product name",
    example: "Modern Desk Lamp",
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "Product description",
    example: "A sleek and modern desk lamp with adjustable brightness",
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: "Product price",
    example: 99.99,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    type: String,
    required: false,
    description: "Product image URL",
    example: "https://res.cloudinary.com/dpbojvn3k/image/upload/v1739982651/products/uhfgjipvph4ouai2jbib.jpg",
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: "Product designer",
    example: "John Doe",
  })
  @IsOptional()
  @IsString()
  designer?: string;

  @ApiProperty({
    type: [String],
    required: false,
    description: "Available product colors",
    example: ["Black", "White", "Silver"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiProperty({
    type: String,
    required: true,
    description: "Product category",
    example: "Lighting",
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: "Whether the product is featured",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
