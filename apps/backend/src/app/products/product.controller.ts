import { Controller, Post, Body, Delete, Get, UseGuards, Param, Query, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { IProduct } from '@penny-app/shared';
import { CreateProductDto } from '../lib/dtos/products-dtos';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getProducts(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<{ products: IProduct[], count: number }> {
    return await this.productService.getProducts(+limit, +offset);
  }
  
  @Get('/landingpage')
  async getLandingPageProducts(
  ): Promise<{ products: IProduct[] }> {
    return await this.productService.getLandingPageProducts();
  }
}
